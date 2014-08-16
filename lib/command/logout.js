var rm = require('./session/rm');

module.exports = function logout(info, req, next) {
  rm.call(this, info, req, next);
}
