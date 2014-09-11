var jar = require('../../jar');

module.exports = function rm(info, req, next) {
  var scope = this;
  var username = info.args[0];
  var server = info.args[1] || this.server;
  var opts = req.db.options(req, {username: username});
  if(username && username !== this.authuser) {
    var item = jar.cookie[server], del = false;
    if(item && item.list) {
      del = item.list.hasOwnProperty(username);
      delete item.list[username];
    }
    return req.print({ok: del}, req, next);
  }
  req.db().session.rm(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    delete scope.configure().authinfo;
    req.login.auth = null;
    req.login.credentials = {};
    delete scope.username;
    delete scope.password;
    delete scope.authuser;
    req.print(doc, req, next);
  })
}
