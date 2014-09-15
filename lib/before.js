var logger = require('cli-logger');

/**
 *  Entry point for handling 401 responses.
 */
function unauth(info, req, next, err, res, doc, cb) {
  var dbh = req.db(), scope = this, errors = this.errors;
  req.auth(info, req, err, function(info, req, err, last) {
    scope.emit('unauth', errors.EAUTH_REQUIRED, info, req, next, err, res, doc);
    if(last) return dbh.repeat();
  });
}

function before(info, req, next) {
  var dbh = req.db(), scope = this, log = this.log;
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
      // TODO: include query string
      // title case hyphenated keys would be nice
      log.print(opts, '%s > %s %s', nm.toUpperCase(), req.method, req.url);
      for(var k in req.headers) {
        log.print(opts, '%s > %s: %s',
          nm.toUpperCase(), getPrettyHeader(k), req.headers[k]);
        //log.print(opts, '%j', req.headers);
      }
    }
    dbh.on('noop', nonop);
  }

  function authenticate(err, res, doc, db) {
    unauth.call(scope, info, req, next, err, res, doc, db);
  }

  dbh.on('401', authenticate).on('403', authenticate);
  next();
}

module.exports = before;
