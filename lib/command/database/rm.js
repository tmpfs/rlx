module.exports = function rm(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {db: this.database};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE, next);
  }
  var dbh = req.db();
  dbh.db.rm(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, req, next);
    print(doc, req, next);
  })
}
