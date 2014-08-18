module.exports = function commit(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {db: this.database};
  var dbh = req.db();
  dbh.db.commit(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
