var section = require('cdb').sections.admins;
var prompt = require('../../prompt');

module.exports = function rm(info, req, next) {
  var errors = this.errors;
  var opts = req.db.options(req, {section: section, key: info.args[0]});
  if(!opts.key) return req.error(errors.EUSERNAME_REQUIRED, req, next);
  var dbh = req.db();
  prompt.rm.call(this, info, req, {}, function(err, res) {
    if(err) return req.error(err, req, next);
    if(res.accept !== true) return next();
    dbh.config.rm(opts, function(err, res, doc) {
      if(res && res.statusCode === 404) {
        return req.error(errors.ENO_ADMIN, req, next, [opts.key]);
      }
      if(err) return req.error(err, req, next);
      var passwd = doc;
      doc = {};
      doc[opts.key] = passwd;
      req.print(doc, req, next);
    })
  });
}
