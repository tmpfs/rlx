module.exports = function set(info, req, next) {
  var opts = {db: this.database};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE, next);
  }
  if(req.document && req.document.body) {
    opts.body = req.document.body;
  }
  var dbh = req.db();
  dbh.db.security().set(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
