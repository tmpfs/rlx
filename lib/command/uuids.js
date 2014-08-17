module.exports = function uuids(info, req, next) {
  var print = require('../util/print').bind(this);
  var opts = {qs: {}};
  if(this.count) opts.qs.count = this.count;
  req.db().uuids(opts, function(err, res, doc) {
    req.db.add(req, err, res, null, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
