var cp = require('../document/cp');
module.exports = function lcp(info, req, next) {
  cp.call(this, info, req, next);
}
