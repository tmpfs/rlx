module.exports = function rm(info, req, next) {
  req.db().session.rm(function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
