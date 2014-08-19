module.exports = function restart(info, req, next) {
  var dbh = req.db();
  dbh.restart(function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
