module.exports = function rm(info, req, next) {
  var opts = req.db.options();
  req.db().session.rm(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.login.auth = null;
    req.print(doc, req, next);
  })
}
