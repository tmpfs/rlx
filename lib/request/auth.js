var login = require('../command/login');

function auth(info, req, err) {
  var dbh = req.db();
  if(err && err.status === 401) {
    //console.log('auth should repeat request %s %s', this.username, this.password);
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
