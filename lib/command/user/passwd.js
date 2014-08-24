var userdb = require('./userdb');

module.exports = function passwd(info, req, next) {
  var opts = req.db.options(
    {db: this.database || userdb.default, id: this.id || req.vars.name});
  if(!opts.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  opts.id = userdb.id(opts.id);
  if(this.rev) {
    //override parsed query string
    req.query.rev = this.rev;
  }
  opts.qs = req.query;

  var password = req.vars.password || info.args[0];
  if(!password) {
    return req.error(this.errors.EPASSWORD_REQUIRED, req, next);
  }

  var dbh = req.db();
  req.db().db.doc.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    doc.password = password;
    opts.body = doc;
    dbh.db.doc.save(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      req.print(doc, req, next);
    })
  })
}
