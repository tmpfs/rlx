module.exports = function add(info, req, next) {
  var opts = req.db.options(req, {db: this.database || info.args[0]});
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var dbh = req.db();
  dbh.db.add(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
