module.exports = function list(info, req, next) {
  var dbh = req.db();
  req.db().ls(function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
