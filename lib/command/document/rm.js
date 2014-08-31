module.exports = function rm(info, req, next) {
  var opts = req.db.options(req, {db: this.database, id: this.id});
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!opts.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }

  var dbh = req.db();
  dbh.doc.rm(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
