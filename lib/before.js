/**
 *  Entry point for handling 401 responses.
 */
function unauth(info, req, next, err, res, doc, cb) {
  var dbh = req.db(), scope = this, errors = this.errors;
  req.auth(info, req, err, function(info, req, err, last) {
    //console.log('got last %s', last);
    scope.emit('unauth', errors.EAUTH_REQUIRED);
    if(last) return dbh.repeat();
    //scope.error(errors.EAUTH_REQUIRED);
  });
}

function before(info, req, next) {
  var dbh = req.db(), scope = this;
  dbh.removeAllListeners('401');
  dbh.removeAllListeners('403');

  //console.log('before called');
  //console.dir(info);

  //var cmd = info.args[0];
  //var destructive = ['rm'];

  //if() {

  //}

  function authenticate(err, res, doc, db) {
    //console.log('got 401 listener handler');
    unauth.call(scope, info, req, next, err, res, doc, db);
  }

  dbh.on('401', authenticate).on('403', authenticate);
  next();
}

module.exports = before;
