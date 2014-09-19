var set = require('./session/set');

module.exports = function login(info, req, next) {
  this.username = this.username || info.args[0];
  set.call(this, info, req, next);
}
