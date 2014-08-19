module.exports = function set(info, req, next) {
  var opts = {section: info.args[0], key: info.args[1], value: info.args[2]};
  console.dir(opts);
  if(!opts.section) return req.error(
    this.errors.ECONFIG_SECTION_REQUIRED, req, next);
  if(!opts.key) return req.error(
    this.errors.ECONFIG_KEY_REQUIRED, req, next);
  if(!opts.value) return req.error(
    this.errors.ECONFIG_VALUE_REQUIRED, req, next);
  var dbh = req.db();
  dbh.config.set(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
