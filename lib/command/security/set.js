module.exports = function set(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {db: this.database};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE, next);
  }
  if(req.document && req.document.body) {
    opts.body = req.document.body;
  }
  var dbh = req.db();
  dbh.db.security().set(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
