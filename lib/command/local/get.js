var get = require('../document/get');
module.exports = function lget(info, req, next) {
  get.call(this, info, req, next);
}
