module.exports = function exists(info, req, next) {
  var opts = req.db.options(req, {db: this.database});
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var dbh = req.db();
  dbh.db.info(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    var code = res && res.statusCode ? res.statusCode : 500;
    if(code !== 200 && code !== 404) {
      doc = req.db().getErrorDocumentByStatusCode(code);
    }
    if(err && code !== 200 && code !== 404) return req.error(err, req, next);
    doc = {ok: res.statusCode === 200};
    req.print(doc, req, next);
  })
}
