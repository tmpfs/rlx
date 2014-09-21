var validate = require('./validate');

module.exports = function head(info, req, next) {
  validate(info, req, function(uri) {
    var dbh = req.db();
    var opts = req.db.options(req, {url: uri});
    dbh.head(opts, function(err, res, doc) {
      if(err && !res || err && res && res.statusCode !== 404) {
        return req.error(err, req, next);
      }
      if(res) {
        doc = {status: res.statusCode, headers: res.headers};
      }
      req.print(doc, req, next);
    });
  });
}
