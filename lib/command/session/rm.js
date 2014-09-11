module.exports = function rm(info, req, next) {
  var scope = this;
  var opts = req.db.options(req);
  req.db().session.rm(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    delete scope.configure().authinfo;
    req.login.auth = null;
    req.login.credentials = {};
    delete scope.username;
    delete scope.password;
    req.print(doc, req, next);
  })
}
