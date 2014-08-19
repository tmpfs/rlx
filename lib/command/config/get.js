module.exports = function get(info, req, next) {
  var opts = {};
  if(info.args[0]) opts.section = info.args[0];
  if(info.args[1]) opts.key = info.args[1];
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
