var login = require('../command/login');
var prompt = require('cli-input');

function auth(info, req, err, cb) {
  var scope = this, log = this.log;
  var dbh = req.db(), last = dbh.peek();
  if(typeof err === 'function') {
    cb = err;
    err = null;
  }
  var retries = req.rc.login.retries || 4;
  req.login.retries = 0;
  var hasCredentials = req.hasCredentials();
  var authRequired = (!err && cb) || (err && err.status === 401);
  var authenticated = req.isAuthenticated(req);
  authRequired = authRequired && !authenticated;
  function dologin(cb) {
    //console.log('attempt login %s : %s', scope.username, scope.password);
    req.login.silent = true;
    var listeners = dbh.listeners('401');
    dbh.removeAllListeners('401');
    function onAuth() {
      //console.log('got repeat auth attempt %s', req.login.);
      //req.login.retries++;
      //dologin.call(scope, cb);
      log.error('authentication failed');
      for(var i = 0;i < listeners.length;i++) {
        dbh.on('401', listeners[i]);
      }
    }
    dbh.once('401', onAuth);
    login.call(this, info, req, function() {
      if(cb) return cb.apply(scope, [info, req, err, last].concat(arguments));
      //if(last) return dbh.repeat();
    });
    return true;
  }
  //console.log('isAuthenticated %s', authenticated);
  //console.log('authRequired %s', authRequired);
  if(authRequired && hasCredentials) {
    // suppress printing response from login command
    return dologin.call(scope, cb);
  }else if(authRequired && !hasCredentials){
    //console.log('asking ');
    return ask.call(scope, function(res) {
      scope.username = res.name;
      scope.password = res.pass;
      return dologin.call(scope, cb);
    });
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

function ask(cb) {
  this.log.warn('authentication required but no auth credentials');
  var p = prompt();
  p.on('error', function(err) {
    // consume errors
  })
  prompt.sets.username[0].default = this.username;
  p.run(prompt.sets.userpass, function(err, result) {
    cb(result.map);
  });
}

module.exports = auth;
module.exports.hasCredentials = hasCredentials;
module.exports.isAuthenticated = isAuthenticated;
