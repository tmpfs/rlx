var login = require('../command/login');
var prompt = require('../prompt');
//var prompt = require('cli-input');
//var colors = require('../prompt').colors;

function auth(info, req, err, cb) {
  var scope = this, log = this.log;
  var dbh = req.db(), last = dbh.peek();
  if(typeof err === 'function') {
    cb = err;
    err = null;
  }

  var url;
  if(last && last.res) {
    url = last.res.req.path;
  }

  //console.log('url %s', url);

  var retries = req.rc.login.retries || 4;
  req.login.retries = 0;

  var hasCredentials = req.hasCredentials();
  var authRequired = (!err && cb)
    || (err && err.status === 401 || err.status === 403);

  var authenticated = req.isAuthenticated(req);
  authRequired = authRequired && !authenticated;

  function dologin(cb) {
    //console.log('attempt login %s : %s', scope.username, scope.password);
    //console.dir(new Error().stack);

    req.login.silent = true;

    var listeners = dbh.listeners('401')
      , forbidden = dbh.listeners('403');
    dbh.removeAllListeners('401');
    dbh.removeAllListeners('403');
    function onAuth() {
      delete scope.username;
      delete scope.password;
      var ps = scope.configure().ps;
      //console.dir(ps);
      log.error('authentication failed');
      for(var i = 0;i < listeners.length;i++) {
        dbh.on('401', listeners[i]);
      }
      for(i = 0;i < forbidden.length;i++) {
        dbh.on('403', forbidden[i]);
      }
      if(ps) {
        //console.log('resume ps');
        ps.resume();
      }
      return cb();
    }
    dbh.once('401', onAuth).once('403', onAuth);

    login.call(this, info, req, function() {
      if(cb) return cb.apply(scope, [info, req, err, last].concat(arguments));
    });
    return true;
  }
  //console.log('isAuthenticated %s', authenticated);
  //console.log('authRequired %s', authRequired);
  if(authRequired && hasCredentials) {
    // suppress printing response from login command
    return dologin.call(scope, cb);
  }else if(authRequired && !hasCredentials){
    if(!url) {
      log.info('authentication required');
    }else{
      log.info('authentication required for %s', url);
    }
    return prompt.credentials.call(scope, info, req, function(err, res) {
      //scope.username = res.name;
      //scope.password = res.pass;
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

module.exports = auth;
module.exports.hasCredentials = hasCredentials;
module.exports.isAuthenticated = isAuthenticated;
