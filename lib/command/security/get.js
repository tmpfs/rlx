module.exports = function get(info, req, next) {
  var opts = req.db.options(req, {db: this.database});
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var dbh = req.db();
  dbh.sec.get(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
