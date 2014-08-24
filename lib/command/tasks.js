module.exports = function tasks(info, req, next) {
  var opts = req.db.options(req);
  var dbh = req.db();
  dbh.tasks(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
