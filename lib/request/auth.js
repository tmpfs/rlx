var login = require('../command/login');

function auth(info, req, err, cb) {
  var scope = this;
  var dbh = req.db(), last = dbh.peek();
  if(typeof err === 'function') {
    cb = err;
    err = null;
  }
  var hasCredentials = req.hasCredentials();
  var authRequired = (!err && cb) || (err && err.status === 401);
  var authenticated = req.isAuthenticated(req);
  authRequired = authRequired && !authenticated;
  //console.log('isAuthenticated %s', authenticated);
  //console.log('authRequired %s', authRequired);
  if(authRequired && hasCredentials) {
    // suppress printing response from login command
    req.login.silent = true;
    login.call(this, info, req, function() {
      if(cb) return cb.apply(scope, [info, req, err, last].concat(arguments));
      //if(last) return dbh.repeat();
    });
    return true;
  }else if(authRequired && !hasCredentials){
    this.log.warn('authentication required but no auth credentials');
    //console.dir(new Error().stack);
  }
  if(cb) cb.apply(scope, [info, req, err, last]);
  return false;
}

function hasCredentials() {
  return this.username !== undefined && this.password !== undefined;
}

function isAuthenticated(req) {
  return req.login.auth && req.login.auth.username
    && req.login.auth.res && req.login.auth.res.statusCode === 200;
}

module.exports = auth;
module.exports.hasCredentials = hasCredentials;
module.exports.isAuthenticated = isAuthenticated;
