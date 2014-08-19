var section = require('cdb').sections.admins;

module.exports = function get(info, req, next) {
  var scope = this;
  var opts = {section: section};
  if(info.args[0]) opts.key = info.args[0];
  if(!opts.key) return next(this.errors.ECONFIG_KEY_REQUIRED);
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    if(err) return req.error(err, req, next);
    var passwd = doc;
    doc = {};
    doc[opts.key] = passwd;
    req.print(doc, req, next);
  })
}
