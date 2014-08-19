var section = require('cdb').sections.admins;
var get = require('./get');

module.exports = function add(info, req, next) {
  var scope = this;
  var opts = {section: section};
  opts.key = info.args[0];
  opts.value = info.args[1];
  if(!opts.key) return next(this.errors.EUSERNAME_REQUIRED);
  if(!opts.value) return next(this.errors.EPASSWORD_REQUIRED);
  var dbh = req.db();
  dbh.config.set(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    scope.username = opts.key;
    scope.password = opts.value;
    get.call(scope, info, req, next);
  })
}
