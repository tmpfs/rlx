var validate = require('./validate');

module.exports = function get(info, req, next){
  validate.call(this, info, req, function(err, uri) {
    if(err) return req.error(err, req, next);
    var dbh = req.db();
    var opts = req.db.options(req, {url: uri});
    dbh.get(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      // TODO: negotiate mime type for printing
      req.print(doc, req, next);
    });
  });
}
