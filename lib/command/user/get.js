var userdb = require('./userdb');

module.exports = function get(info, req, next) {
  var id = this.id || req.vars.name || info.args[0];
  if(!id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  var opts = req.db.options(req,
    {db: this.database || userdb.default, id: id});
  opts.id = userdb.id(opts.id);

  req.vars.name = id;

  var dbh = req.db();
  dbh.doc.get(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
