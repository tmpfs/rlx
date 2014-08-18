var userdb = require('./userdb');
var editor = require('../../util/editor');
var qs = require('../../util/couch').querystring;
var temp = require('../../util/temp');

module.exports = function edit(info, req, next) {
  var print = require('../../util/print').bind(this);
  var log = this.log;
  var id = this.id || this.username;
  var rev = this.rev;
  var opts = {db: this.database || userdb.default};
  if(!id) {
    return next(this.errors.EID_USERNAME_OPTION);
  }
  id = userdb.id(id);
  opts.id = id;
  if(rev) {
    opts.qs = qs.stringify({
      rev: rev
    });
  }
  req.db().db.doc.get(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    temp.create.call(this, req, {body: doc}, function(err, file) {
      if(err) return req.error(err, next);
      var eopts = {file: file, hash: req.rc.edit.hash};
      new editor.EditorRequest(eopts, function(err, ereq) {
        if(err) return next(err);
        new editor.Edit(ereq, function(err, ereq, eres, edit) {
          if(err) return next(err);
          var success = eres.success();
          var modified = eres.modified();
          if(!modified) {
            log.warn('no changes detected, aborting');
            return next();
          }
          opts.body = doc;
          req.db().db.doc.save(opts, function(err, res, doc) {
            req.db.add(req, err, res, opts, doc);
            if(err) return req.error(err, next);
            print(doc, req, next);
          })
        })
      });
    })
  })
}
