var dget = require('../document/get');

module.exports = function get(info, req, next) {
  dget.call(this, info, req, next);
}
