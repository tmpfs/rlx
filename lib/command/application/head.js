var dhead = require('../document/head');

module.exports = function head(info, req, next) {
  dhead.call(this, info, req, next);
}
