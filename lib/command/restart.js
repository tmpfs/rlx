module.exports = function restart(info, req, next) {
  var print = require('../util/print').bind(this);
  req.db().restart(function(err, res, doc) {
    req.db.add(req, err, res, null, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
