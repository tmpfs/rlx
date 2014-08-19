module.exports = function restart(info, req, next) {
  var print = require('../util/print').bind(this);
  var dbh = req.db();
  dbh.restart(function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, null, doc);
    if(err) return req.error(err, req, next);
    print(doc, req, next);
  })
}
