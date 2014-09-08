module.exports = function rm(info, req, next) {
  var scope = this;
  var opts = req.db.options(req);
  req.db().session.rm(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.login.auth = null;
    delete scope.username;
    delete scope.password;
    req.print(doc, req, next);
  })
}
