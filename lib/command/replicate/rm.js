var add = require('./add');

module.exports = function rm(info, req, next) {
  req.vars.cancel = true;
  add.call(this, info, req, next);
}
