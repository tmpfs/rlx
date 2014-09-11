var jar = require('../../jar');
var login = require('../session/set');

module.exports = function su(info, req, next) {
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }
  var uname = info.args[0];
  var server  = info.args[1] || this.server;
  var exists = jar.cookie[server]
    && jar.cookie[server].list
    && jar.cookie[server].list[uname];
  if(exists) {
    jar.cookie[server].user = uname;
    this.authuser = uname;
    return req.print({ok: true}, req, next);
  }else{
    this.username = uname;
    this.server = server;
    login.call(this, info, req, next);
  }
}
