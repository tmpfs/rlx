var userdb = require('./userdb');
var editor = require('../../util/editor');
var temp = require('../../util/temp');
var types = require('../../util/types');

module.exports = function edit(info, req, next) {
  var log = this.log;
  var opts = req.db.options(req,
    {db: this.database || userdb.default, id: this.id || req.vars.name});
  if(!opts.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }

  opts.id = userdb.id(opts.id);

  var dbh = req.db();
  dbh.doc.get(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    var topts = {body: doc, type: types.JSON};
    temp.create.call(this, req, topts, function(err, file) {
      if(err) return req.error(err, req, next);
      var eopts = {file: file, hash: req.rc.edit.hash};
      req.edit(info, req, next, eopts, function(ereq, eres, edit) {
        var modified = eres.modified();
        if(!modified) {
          log.warn('no changes detected, aborting');
          return next();
        }
        // TODO: load document content when
        // TODO: not hashing files
        opts.body = eres.document ? '' + eres.document : doc;
        //console.dir(opts.body);
        dbh.doc.save(opts, function(err, res, doc) {
          if(err) return req.error(err, req, next);
          req.print(doc, req, next);
        })
      })
    })
  })
}
