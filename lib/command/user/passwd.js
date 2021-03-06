var userdb = require('./userdb');

module.exports = function passwd(info, req, next) {
  var opts = req.db.options(req,
    {db: this.database || userdb.default, id: this.id || req.vars.name});
  if(!opts.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  opts.id = userdb.id(opts.id);

  var password = req.vars.password || info.args[0];
  if(!password) {
    return req.error(this.errors.EPASSWORD_REQUIRED, req, next);
  }

  var dbh = req.db();
  dbh.doc.get(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    doc.password = password;
    opts.body = doc;
    dbh.doc.save(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      req.print(doc, req, next);
    })
  })
}
