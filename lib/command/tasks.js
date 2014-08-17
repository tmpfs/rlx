module.exports = function tasks(info, req, next) {
  var print = require('../util/print').bind(this);
  req.db().tasks(function(err, res, doc) {
    req.db.add(req, err, res, null, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
