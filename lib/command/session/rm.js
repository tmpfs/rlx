module.exports = function rm(info, req, next) {
  var print = require('../../util/print').bind(this);
  req.db().session.rm(function(err, res, doc) {
    req.db.add(req, err, res, null, doc);
    if(err) return req.error(err, req, next);
    print(doc, req, next);
  })
}
