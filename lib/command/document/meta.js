var get = require('./get');
module.exports = function meta(info, req, next) {
  req.query = req.query || {};
  req.query.meta = true;
  get.call(this, info, req, next);
}
