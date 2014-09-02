var async = require('async');
var files = require('../files');
var progress = require('../progress');

function upload(file, info, req, next, cb) {
  var opts = req.db.options(
    req,
    {
      db: this.database,
      id: this.id,
      attname: file.path,
      file: file.file,
      ddoc: this.ddoc
    }
  );

  var dbh = req.db();
  opts.progress = req.rc.progress && req.rc.progress.upload;

  var conn = dbh.att.put(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    cb(err, res, doc);
  });

  dbh.att.once('open', function onopen(conn, stats) {
    var bar = progress({prefix: file.path});
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

function up(options, info, req, next, cb) {
  options = options || {};
  var scope = this;
  var info = {missing:[], files: []};
  var list = options.files || [];
  var attname = options.attname || [];
  var patterns = options.patterns;

  var options = {
    list: list,
    require: false,
    all: true,
    recursive: this.recursive,
    filter: function(file, options, err, stats) {
      return !err && stats;
    },
    patterns: patterns
  }

  files.call(this, req, options, function(err, list) {
    if(!list.length) {
      return cb(null, null, null, list);
    }
    // legacy
    if(list.length === 1 && typeof attname === 'string') {
      list[0].file.path = attname;
    }
    async.concatSeries(list, function(item, callback) {
      upload.call(scope, item.file, info, req, next,
        function(err, res, doc) {
          callback(err, doc);
        }
      )
    }, function(err, results) {
      cb(err, null, results, list);
    })
  })
}

module.exports = up;
module.exports.upload = upload;
