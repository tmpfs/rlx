var userdb = require('./userdb');

module.exports = function passwd(info, req, next) {
  var opts = req.db.options({db: this.database || userdb.default, id: this.id});
  if(!opts.id) {
    return req.error(this.errors.EID_REQUIRED, next);
  }
  opts.id = userdb.id(opts.id);
  if(this.rev) {
    //override parsed query string
    req.query.id.rev = this.rev;
  }
  opts.qs = req.query.id;

  var password = info.args[0];
  if(!password) {
    return next(this.errors.EPASSWORD_REQUIRED);
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
