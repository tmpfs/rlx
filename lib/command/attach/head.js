module.exports = function head(info, req, next) {

  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.id && !this.ddoc) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  if(!this.attachment) {
    return req.error(this.errors.EATTACHMENT_REQUIRED, req, next);
  }
  var opts = req.db.options(
    req,
    {
      db: this.database,
      id: this.id,
      attname: this.attachment,
      ddoc: this.ddoc
    }
  );
  var dbh = req.db();
  dbh.att.head(opts, function(err, res, doc) {
    //if(err) return req.error(err, req, next);
    if(err && !doc) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
