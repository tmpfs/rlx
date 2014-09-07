var section = require('cdb').sections.admins;

module.exports = function rm(info, req, next) {
  var opts = req.db.options(req, {section: section, key: info.args[0]});
  if(!opts.key) return req.error(this.errors.EUSERNAME_REQUIRED, req, next);
  var dbh = req.db();
  dbh.config.rm(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    var passwd = doc;
    doc = {};
    doc[opts.key] = passwd;
    req.print(doc, req, next);
  })
}
