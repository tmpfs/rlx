var async = require('async');
var path = require('path');
var progress = require('../progress');
var match = require('../match');
var mkdirs = require('../mkdirs');

function download(dbdoc, attname, options, info, req, next, cb) {
  var scope = this;
  var output = path.join(options.output, attname);
  this.log.debug('%s/%s > %s', dbdoc._id, attname, output);
  function get() {
    var opts = req.db.options(
      req,
      {
        db: this.database,
        id: this.id,
        attname: attname,
        file: output,
        ddoc: this.ddoc
      }
    );

    var dbh = req.db();
    opts.progress = req.rc.progress && req.rc.progress.upload;
    var conn = dbh.att.get(opts, function(err, res, doc) {
      if(req.auth(info, req, err)) {
        return;
      }
      cb(err,
        {
          code: res.statusCode,
          name: attname,
          file: output,
          id: dbdoc._id,
          rev: dbdoc._rev,
          attachment: dbdoc._attachments[attname]
        }
      );
    });

    dbh.att.once('open', function(conn) {
      var bar = progress({prefix: 'get'});
      function onprogress(amount, uploaded, total, length) {
        var end = uploaded === total;
        bar(amount, length, total, end);
        if(end) {
          conn.removeListener('progress', onprogress);
        }
      }
      conn.on('progress', onprogress);
    })
  }

  mkdirs(options.output, attname, function(err) {
    if(err) return cb(err);
    get.call(scope);
  })
}

// fetch target document
function get(info, req, next, cb) {
  var opts = req.db.options(
    req, {db: this.database, id: this.id, ddoc: this.ddoc});
  var dbh = req.db();
  dbh.doc.get(opts, function(err, res, doc) {
    //if(err) return cb(err);
    cb(err, res, doc);
  })
}

function dl(options, info, req, next, cb) {
  var scope = this;
  var list = options.files;
  var patterns = options.patterns || [];
  patterns = list.concat(patterns);
  get.call(this, info, req, next, function(err, res, doc) {
    if(err) return cb(err);
    doc = doc || {};
    var attachments = doc._attachments || {};
    var keys = Object.keys(attachments);
    if(!keys.length) {
      return cb(new Error('document has no attachments'));
    }
    //console.dir(keys);
    async.concatSeries(keys, function(file, callback) {
      if(!match(file, patterns)) {
        //console.log('mismatch on pattern %s', file);
        // TODO: warn on pattern mismatch
        return callback();
      }else{
        download.call(scope, doc, file, options, info, req, next, callback);
      }
    }, function(err, results) {
      cb(err, results);
    });
  })
}

module.exports = dl;
module.exports.download = download;
