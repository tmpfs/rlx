module.exports = function show(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.ddoc) {
    return req.error(this.errors.EDDOC_REQUIRED, req, next);
  }
  if(!this.nm) {
    return req.error(this.errors.ENAME_REQUIRED, req, next);
  }

  var opts = req.db.options(
    req,
    {
      db: this.database,
      id: this.id,
      ddoc: this.ddoc,
      name: this.nm
    }
  );
  var dbh = req.db();
  dbh.design.show(opts, function(err, res, doc) {
    req.print(doc, req, next);
  })
}
