var get = require('./get');
module.exports = function conflicts(info, req, next) {
  req.query = req.query || {};
  req.query.conflicts = true;
  get.call(this, info, req, next);
}
