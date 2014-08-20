module.exports = function rm(info, req, next) {
  var opts = req.db.options(opts);
  req.db().session.rm(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
