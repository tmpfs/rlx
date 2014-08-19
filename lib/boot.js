var fsutil = require('cli-command').fs;
var request = require('./request');

var print = require('./util/print');

module.exports = function boot(req, next) {
  var home = fsutil.home();
  if(!home) {
    return next(this.errors.EHOME);
  }

  // configure directory information
  request.dirs(req, home);

  // request decoration functions
  req.auth = request.auth.bind(this);
  req.db = request.db.bind(this);
  req.edit = request.edit.bind(this);
  req.error = request.error.bind(this);
  req.print = print.bind(this);
  next();
}
