module.exports = function commit(info, req, next) {
  var opts = req.db.options({db: this.database});
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  // TODO: implement query parameters
  var dbh = req.db();
  dbh.db.changes(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
