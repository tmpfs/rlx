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
  var dbh = req.db(), scope = this;
  dbh.removeAllListeners('401');
  dbh.removeAllListeners('403');

  function authenticate(err, res, doc, db) {
    unauth.call(scope, info, req, next, err, res, doc, db);
  }

  dbh.on('401', authenticate).on('403', authenticate);
  next();
}

module.exports = before;
