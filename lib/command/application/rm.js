var drm = require('../document/rm');

module.exports = function rm(info, req, next) {
  drm.call(this, info, req, next);
}
