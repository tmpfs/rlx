var fsutil = require('cli-command').fs;
var request = require('./request');

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
  req.db.add = request.db.add.bind(this);
  req.edit = request.edit.bind(this);
  req.error = request.error.bind(this);
  next();
}
