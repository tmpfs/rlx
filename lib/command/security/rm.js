module.exports = function rm(info, req, next) {
  var opts = req.db.options(req, {db: this.database});
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  opts.body = {};
  var dbh = req.db();
  dbh.sec.set(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
