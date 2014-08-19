module.exports = function commit(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {db: this.database};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE, next);
  }
  var dbh = req.db();
  dbh.db.commit(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    print(doc, req, next);
  })
}
