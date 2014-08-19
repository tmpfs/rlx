module.exports = function get(info, req, next) {
  var opts = {db: this.database, id: this.id};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, next);
  }
  if(!opts.id) {
    return req.error(this.errors.EID_REQUIRED, next);
  }
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
