module.exports = function restart(info, req, next) {
  var opts = req.db.options();
  var dbh = req.db();
  dbh.restart(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
