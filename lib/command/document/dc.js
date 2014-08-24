var get = require('./get');
module.exports = function delconflicts(info, req, next) {
  req.query = req.query || {};
  req.query.deleted_conflicts = true;
  get.call(this, info, req, next);
}
