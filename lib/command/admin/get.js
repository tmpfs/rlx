var SECTION = require('cdb').sections.admins;

module.exports = function get(info, req, next) {
  var scope = this;
  var print = require('../../util/print').bind(this);
  var opts = {section: SECTION};
  if(info.args[0]) opts.key = info.args[0];
  if(!opts.key) return next(this.errors.ECONFIG_KEY_REQUIRED);
  var dbh = req.db();
  dbh.config.get(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    var passwd = doc;
    doc = {};
    doc[opts.key] = passwd;
    print(doc, req, next);
  })
}
