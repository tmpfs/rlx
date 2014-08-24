var section = require('cdb').sections.admins;

module.exports = function get(info, req, next) {
  var opts = req.db.options(req, {section: section, key: info.args[0]});
  if(!opts.key) return req.error(this.errors.EUSERNAME_REQUIRED, req, next);
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    var passwd = doc;
    doc = {};
    doc[opts.key] = passwd;
    req.print(doc, req, next);
  })
}
