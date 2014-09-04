var dirs = require('./dirs');

module.exports = function dir(info, req, next) {
  var list = dirs.call(this, req)
  req.print(list, req, next);
}
