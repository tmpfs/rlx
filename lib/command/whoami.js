var get = require('./session/get');

module.exports = function whoami(info, req, next) {
  get.call(this, info, req, next);
}
