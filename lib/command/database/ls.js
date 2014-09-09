module.exports = function ls(info, req, next) {
  console.log('db ls called');
  var opts = req.db.options(req);
  var dbh = req.db();
  req.db().ls(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
