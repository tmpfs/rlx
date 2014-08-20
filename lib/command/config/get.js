module.exports = function get(info, req, next) {
  var opts = req.db.options({section: info.args[0], key: info.args[1]});
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
