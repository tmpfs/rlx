var set = require('./session/set');

module.exports = function login(info, req, next) {
  this.username = info.args[0] || this.username;
  set.call(this, info, req, next);
}
