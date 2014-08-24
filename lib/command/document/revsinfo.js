var get = require('./get');
module.exports = function revsinfo(info, req, next) {
  req.query = req.query || {};
  req.query.revs_info = true;
  get.call(this, info, req, next);
}
