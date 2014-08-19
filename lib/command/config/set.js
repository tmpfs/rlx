module.exports = function set(info, req, next) {
  var opts = {};
  if(info.args[0]) opts.section = info.args[0];
  if(info.args[1]) opts.key = info.args[1];
  if(info.args[2]) opts.value = info.args[2];
  if(!opts.section) return next(this.errors.ECONFIG_SECTION_REQUIRED);
  if(!opts.key) return next(this.errors.ECONFIG_KEY_REQUIRED);
  if(!opts.value) return next(this.errors.ECONFIG_VALUE_REQUIRED);
  var dbh = req.db();
  dbh.config.set(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
