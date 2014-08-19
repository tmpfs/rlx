module.exports = function compact(info, req, next) {
  var opts = {db: this.database};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE, next);
  }
  var dbh = req.db();
  dbh.db.compact(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
