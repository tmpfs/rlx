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


  if(this.http) {
    dbh.log.useConsoleStream();
    dbh.log.conf = this.log.conf;
    dbh.log.level(this.log.level());
  }else{
    dbh.log.level(logger.NONE);
  }

  //console.dir(req.result);

  if(this.noop) {
    function nonop(err, req) {
      //console.dir(req);

      // TODO: include query string
      // title case hyphenated keys would be nice
      log.info('%s %s', req.method, req.url);
      for(var k in req.headers) {
        log.info('%s: %s', k, req.headers[k]);
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
