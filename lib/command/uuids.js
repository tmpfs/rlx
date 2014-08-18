module.exports = function uuids(info, req, next) {
  var print = require('../util/print').bind(this);
  var opts = {qs: {}};
  if(this.count) opts.qs.count = this.count;
  var dbh = req.db();
  dbh.uuids(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, null, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
