var dcp = require('../document/cp');

module.exports = function cp(info, req, next) {
  dcp.call(this, info, req, next);
}
