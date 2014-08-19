module.exports = function stats(info, req, next) {
  var dbh = req.db();
  dbh.stats(function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
