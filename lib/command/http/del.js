var validate = require('./validate');

module.exports = function del(info, req, next) {
  validate.call(this, info, req, function(err, uri) {
    if(err) return req.error(err, req, next);
    var dbh = req.db();
    var opts = req.db.options(req, {url: uri, body: req.document.body});
    dbh.del(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      // TODO: negotiate mime type for printing
      req.print(doc, req, next);
    });
  });
}
