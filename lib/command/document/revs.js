var get = require('./get');
module.exports = function revs(info, req, next) {
  req.query = req.query || {};
  req.query.revs = true;
  get.call(this, info, req, next);
}
