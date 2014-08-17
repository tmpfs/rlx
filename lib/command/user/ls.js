module.exports = function ls(info, req, next) {
  var print = require('../../util/print').bind(this);
  console.log('user ls');
  next();
}
