module.exports = function cp(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }else if(!this.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }else if(!this.destination) {
    return req.error(this.errors.EDESTINATION_REQUIRED, req, next);
  }
  var opts = req.db.options(
    req, {db: this.database, id: this.id, ddoc: this.ddoc});
  var dbh = req.db();
  dbh.doc.cp(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
