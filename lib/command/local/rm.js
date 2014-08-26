var rm = require('../document/rm');
module.exports = function lrm(info, req, next) {
  rm.call(this, info, req, next);
}
