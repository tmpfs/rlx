module.exports = function stats(info, req, next) {
  var opts = req.db.options(req);
  var dbh = req.db();
  dbh.stats(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
