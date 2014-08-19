module.exports = function get(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {};
  req.db().session.get(opts, function(err, res, doc) {
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, req, next);
    print(doc, req, next);
  })
}
