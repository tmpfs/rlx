var prompt = require('../../prompt');
module.exports = function rm(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(!this.id) {
    return req.error(this.errors.EID_REQUIRED, req, next);
  }
  var opts = req.db.options(
    req, {db: this.database, id: this.id, ddoc: this.ddoc});
  var dbh = req.db();
  prompt.rm.call(this, info, req, {id: opts.id}, function(err, res) {
    if(err) return req.error(err, req, next);
    if(res.accept !== true) return next();
    dbh.doc.rm(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      req.print(doc, req, next);
    })
  });
}
