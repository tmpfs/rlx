module.exports = function add(info, req, next) {
  var opts = {db: this.database};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var dbh = req.db();
  dbh.db.add(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    //console.dir(req.error);
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
