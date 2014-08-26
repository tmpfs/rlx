var add = require('../document/add');
module.exports = function ladd(info, req, next) {
  add.call(this, info, req, next);
}
