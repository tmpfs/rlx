var validate = require('./validate');

module.exports = function head(info, req, next) {
  validate.call(this, info, req, function(err, uri) {
    if(err) return req.error(err, req, next);
    var dbh = req.db();
    var opts = req.db.options(req, {url: uri});
    dbh.head(opts, function(err, res, doc) {
      if(err && !doc) return req.error(err, req, next);
      req.print(doc, req, next);
    });
  });
}
