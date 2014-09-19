var logger = require('cli-logger');
var qs = require('querystring');

/**
 *  Entry point for handling 401 responses.
 */
function unauth(info, req, next, err, res, doc, cb) {
  var dbh = req.db()
    , scope = this
    , log = this.log
    , errors = this.errors;
  req.auth(info, req, err, function(info, req, err, last) {
    var e = errors.EAUTH_REQUIRED;
    if(scope.interactive === false) {
      if(err) {
        log.trace('before.js: non-interactive auth failure %s', err.key);
        return req.error(err, req, next);
      }
      log.trace('before.js: non-interactive auth success');
      return next();
    }
    scope.emit('unauth', e, info, req, next, err, res, doc);
    if(last) {
      log.trace('before.js: unauth repeating last database request');
      return dbh.repeat();
    }
  });
}

function before(info, req, next) {
  var dbh = req.db()
    , scope = this
    , conf = this.configure()
    , log = this.log;

  dbh.removeAllListeners('401');
  dbh.removeAllListeners('403');
  dbh.removeAllListeners('noop');

  if(this.noop) {

    function getPrettyHeader(k) {
      return k.split('-').map(function(s) {
        if(!s) return s;
        return s.charAt(0).toUpperCase() + s.substr(1);
      }).join('-');
    }

    function nonop(err, req) {
      var nm = 'noop';
      var opts = {component: nm, level: logger.DEBUG};
      var u = '' + req.url;
      if(Object.keys(req.qs || {}).length) {
        //console.log('add qs')
        u += '?' + qs.stringify(req.qs);
      }
      log.print(opts, '> %s ' + u, req.method);
      for(var k in req.headers) {
        log.print(opts, '> %s: ' + req.headers[k], getPrettyHeader(k));
      }
    }
    dbh.on('noop', nonop);
  }

  if(!conf.interactive) {
    function authenticate(err, res, doc, db) {
      unauth.call(scope, info, req, next, err, res, doc, db);
    }
    dbh.on('401', authenticate).on('403', authenticate);
  }

  next();
}

module.exports = before;
