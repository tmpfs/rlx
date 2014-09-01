module.exports = function view(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  if(!this.nm) {
    return req.error(this.errors.ENAME_REQUIRED, req, next);
  }
  //console.dir(this.name);
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
  var args = info.args.slice(0);
  dbh.design.view(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    req.print(doc, req, next);
  })
}
