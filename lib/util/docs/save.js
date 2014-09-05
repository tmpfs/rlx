var async = require('async');
var upload = require('../attach').up.upload;

function save(options, info, req, cb) {
  var scope = this, log = this.log;
  options = options || {};
  var dbh = req.db();
  var opts = req.db.options(req, {});
  var list = options.list || [];
  var map = options.map || {};

  // build up bulk document body object
  var body = {docs: []}, i, fo;
  for(i = 0;i < list.length;i++) {
    fo = list[i];
    if(fo && fo.document) {
      body.docs.push(fo.document);
    }
  }
  opts.body = body;

  // save bulk document
  dbh.db.bulk(opts, function(err, res, doc) {
    if(err) return cb(err);
    // process response and check which documents can
    // have attachments saved
    var d, uploads = [];
    if(Array.isArray(doc)) {
      for(i = 0;i < doc.length;i++) {
        d = doc[i];
        if(d.ok === true && d.id && d.rev && map.documents[d.id]) {
          uploads.push(
            {
              res: d,
              document: map.documents[d.id]
          });
        }
      }
    }
    if(!uploads.length) {
      cb(null, doc);
    }else{
      async.concatSeries(uploads, function(item, callback) {
        var doc = item.document;
        var id = item.res.id;
        if(!doc || !doc.attachments || !doc.attachments.length) {
          return callback();
        }
        async.concatSeries(doc.attachments, function(attachment, callback) {
          attachment.id = id;
          if(attachment.path.indexOf(id) === 0) {
            attachment.path = attachment.path.substr(id.length);
            attachment.path = attachment.path.replace(/^\/+/,'');
          }
          upload.call(scope, attachment, info, req, function(err, res, doc) {
            callback(err, doc);
          } )
        }, function(err, results) {
          callback(err, results);
        });
      }, function(err, results) {
        cb(null, doc);
      })
    }
  });
}

module.exports = save;
