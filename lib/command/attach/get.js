module.exports = function get(info, req, next) {

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
      ddoc: this.ddoc
    }
  );
  var name = this.attachment;
  var dbh = req.db();
  dbh.doc.get(opts, function(err, res, doc) {
    doc = doc._attachments || {};
    if(doc[name]) {
      doc = doc[name] || {};
      doc.name = name;
    }else{
      doc = {};
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
