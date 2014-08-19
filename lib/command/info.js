module.exports = function info(info, req, next) {
  var dbh = req.db();
  dbh.info(function(err, res, doc) {
    // NOTE: the server info page (/) never requires
    // NOTE: auth however this clause is to protect
    // NOTE: against a change in that behaviour
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
