var userdb = require('./userdb');

module.exports = function get(info, req, next) {
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

  var dbh = req.db();
  dbh.db.doc.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
