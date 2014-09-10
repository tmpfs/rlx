var fsutil = require('cli-command').fs;
var request = require('./request');

module.exports = function boot(req, next) {
  req.error = request.error.bind(this);

  var home = fsutil.home();
  if(!home) {
    return req.error(this.errors.EHOME, req, next);
  }

  // configure directory information
  request.dirs.call(this, req, home);

  // request decoration functions
  req.auth = request.auth.bind(this);
  req.hasCredentials = request.auth.hasCredentials.bind(this);
  req.isAuthenticated = request.auth.isAuthenticated.bind(this);

  req.db = request.db.bind(this);
  req.db.options = request.db.options.bind(this);
  req.edit = request.edit.bind(this);
  req.print = request.print.bind(this);

  next();
}
