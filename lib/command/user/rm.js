var prompt = require('../../prompt');
var userdb = require('./userdb');

module.exports = function rm(info, req, next) {
  var id = this.id || req.vars.name || info.args[0];
  if(!id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  var opts = req.db.options(req, {db: this.database || userdb.default, id: id});
  opts.id = userdb.id(opts.id);
  var dbh = req.db();
  prompt.rm.call(this, info, req, {id: id}, function(err, res) {
    if(err) return req.error(err, req, next);
    if(res.accept !== true) return next();
    dbh.doc.rm(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      req.print(doc, req, next);
    })
  })
}
