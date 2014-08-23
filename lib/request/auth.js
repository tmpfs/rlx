var login = require('../command/login');

function auth(info, req, err, cb) {
  var scope = this;
  var dbh = req.db(), last = dbh.peek();
  cb = cb || (typeof err === 'function') ? err : null;
  var hasCredentials = this.username && this.password;
  var authRequired = (!err && cb) || (err && err.status === 401);
  if(authRequired && hasCredentials) {
    // suppress printing response from login command
    req.login.silent = true;
    login.call(this, info, req, function() {
      if(cb) return cb.apply(scope, [info, req, next].concat(arguments));
      if(last) return dbh.repeat();
      //next();
    });
    return true;
  }else if(authRequired && !hasCredentials){
    this.log.warn('authentication required but no auth credentials');
  }
  return false;
}

module.exports = auth;
