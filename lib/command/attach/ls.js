module.exports = function ls(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  var opts = req.db.options(req, {db: this.database, id: this.id});
  var dbh = req.db();
  dbh.doc.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    doc = doc._attachments || {};
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
