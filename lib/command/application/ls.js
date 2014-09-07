module.exports = function ls(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var opts = req.db.options(req, {db: this.database});
  var dbh = req.db();
  dbh.design.ls(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
