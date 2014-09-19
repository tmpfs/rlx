var login = require('../command/session/set');
var prompt = require('../prompt');

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

  var retries = req.rc.login.retries || 3;
  req.login.retries = req.login.retries || 0;

  var hasCredentials = req.hasCredentials(req);
  var authRequired = (!err && cb)
    || (err && err.status === 401 || err.status === 403);

  var authenticated = req.isAuthenticated(req);
  authRequired = authRequired && !authenticated;

  var interactive = this.interactive;

  function dologin(credentials, cb) {
    //console.log('attempt login %s : %s', scope.username, scope.password);
    //console.dir(new Error().stack);

    req.login.silent = true;
    req.login.credentials = credentials;

    //console.dir(credentials);

    var server = req.login.server || this.server;

    var listeners = dbh.listeners('401')
      , forbidden = dbh.listeners('403');
    dbh.removeAllListeners('401');
    dbh.removeAllListeners('403');

    function onAuth(err) {
      //console.log('onAuth failure')
      req.login.retries++;
      //delete scope.username;
      delete scope.password;
      req.login.credentials = {};
      var ps = scope.configure().ps;
      //console.dir(arguments);
      if(interactive === false) {
        //console.dir(err);
        return cb.call(scope, info, req, err);
      }
      log.warn('authentication failed for %s@%s',
        credentials.user || scope.username, server);
      for(var i = 0;i < listeners.length;i++) {
        dbh.on('401', listeners[i]);
      }
      for(i = 0;i < forbidden.length;i++) {
        dbh.on('403', forbidden[i]);
      }
      //console.log('retries %s, max : %s', req.login.retries, retries);
      if(req.login.retries >= retries) {
        log.warn('authentication retry attempts limit exceeded');
        req.login.retries = 0;
        if(ps) {
          //console.log('resume ps');
          ps.resume({infinite: true});
        }
        return cb();
      }else{
        // attempt authentication again
        return auth.call(scope, info, req, cb);
      }
    }

    dbh.once('401', onAuth).once('403', onAuth);

    //console.log('calling login %j', credentials);
    login.call(this, info, req, function() {
      if(cb) return cb.apply(scope, [info, req, err, last].concat(arguments));
    });
    return true;
  }

  //console.log('isAuthenticated %s', authenticated);
  //console.log('authRequired %s', authRequired);
  //console.log('hasCredentials %s', hasCredentials);

  //if(interactive === false && !hasCredentials && authRequired) {
    //if(cb) return cb.apply(scope, [info, req, err, last]);
  //}

  if(authRequired && hasCredentials) {
    // suppress printing response from login command
    return dologin.call(scope, getCredentials.call(scope), cb);
  }else if(authRequired && !hasCredentials && interactive !== false){
    //console.log('asking for credentials %s', scope.username);
    //console.log('asking for credentials %s', scope.authuser);
    var remaining = req.login.retries > 0
      ? retries - req.login.retries : retries;
      //console.dir(remaining);
      //console.dir(retries);
      //console.dir(req.login.retries);
    var s = req.login.retries === (retries - 1) ? '' : 's';
    if(!url) {
      log.info('authentication required (%s attempt' + s +' remaining)',
        remaining);
    }else{
      log.info('authentication required for %s (%s attempt' + s + ' remaining)',
        url, remaining);
    }
    return dologin.call(
      scope, {user: this.username}, cb);
  }
  //console.dir('' + cb);
  if(cb) cb.apply(scope, [info, req, err, last]);
  return false;
}

function hasCredentials(req) {
  if(req.login.credentials
    && req.login.credentials.user
    && req.login.credentials.pass) {
    return true;
  }
  return this.username !== undefined && this.password !== undefined;
}

function getCredentials(user, pass) {
  return {user: user || this.username, pass: pass || this.password};
}

function isAuthenticated(req) {
  return req.login.auth && req.login.auth.username
    && req.login.auth.res && req.login.auth.res.statusCode === 200;
}

module.exports = auth;
module.exports.hasCredentials = hasCredentials;
module.exports.isAuthenticated = isAuthenticated;
