module.exports = function list(info, req, next) {
  var print = require('../util/print').bind(this);
  req.db().ls(function(err, res, doc) {
    req.db.add(req, err, res, null, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
