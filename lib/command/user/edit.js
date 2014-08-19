var userdb = require('./userdb');
var editor = require('../../util/editor');
var temp = require('../../util/temp');
var types = require('../../util/types');

module.exports = function edit(info, req, next) {
  var log = this.log;
  var opts = {db: this.database || userdb.default, id: this.id};
  if(!opts.id) {
    return req.error(this.errors.EID, next);
  }

  opts.id = userdb.id(opts.id);
  if(this.rev) {
    //override parsed query string
    req.query.id.rev = this.rev;
  }
  opts.qs = req.query.id;

  var dbh = req.db();
  dbh.db.doc.get(opts, function(err, res, doc) {
    //console.log('got get response %j', err);
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    //console.log('after auth');
    if(err) return req.error(err, req, next);
    var topts = {body: doc, type: types.JSON};
    temp.create.call(this, req, topts, function(err, file) {
      if(err) return req.error(err, req, next);
      var eopts = {file: file, hash: req.rc.edit.hash};
      req.edit(info, req, next, eopts, function(ereq, eres, edit) {
        var success = eres.success();
        var modified = eres.modified();
        if(!modified) {
          log.warn('no changes detected, aborting');
          return next();
        }
        opts.body = doc;
        dbh.db.doc.save(opts, function(err, res, doc) {
          if(err) return req.error(err, req, next);
          req.print(doc, req, next);
        })
      })
    })
  })
}
