var login = require('../command/login');

function auth(info, req, err) {
  var dbh = req.db();
  if(err && err.status === 401) {
    if(this.username && this.password) {
      req.login.silent = true;
      login.call(this, info, req, function() {
        dbh.repeat();
      });
      return true;
    }else{
      this.log.warn('authentication required but no auth credentials');
    }
  }
  return false;
}

module.exports = auth;
