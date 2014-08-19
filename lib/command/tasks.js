module.exports = function tasks(info, req, next) {
  var dbh = req.db();
  dbh.tasks(function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
