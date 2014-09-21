var validate = require('./validate');

module.exports = function copy(info, req, next) {
  validate(info, req, function(uri) {
    var dbh = req.db();
    var opts = req.db.options(req, {url: uri});
    dbh.copy(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      // TODO: negotiate mime type for printing
      req.print(doc, req, next);
    });
  });
}
