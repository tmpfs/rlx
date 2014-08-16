var set = require('./session/set');

module.exports = function login(info, req, next) {
  set.call(this, info, req, next);
}
