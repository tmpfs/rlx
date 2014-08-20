module.exports = function rm(info, req, next) {
  var opts = req.db.options({section: info.args[0], key: info.args[1]});
  if(!opts.section) return req.error(
    this.errors.ECONFIG_SECTION_REQUIRED, req, next);
  if(!opts.key) return req.error(
    this.errors.ECONFIG_KEY_REQUIRED, req, next);
  var dbh = req.db();
  dbh.config.rm(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
