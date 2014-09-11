var loc = require('../../util/location');

module.exports = function pwd(info, req, next) {
  var doc = loc.cwd.call(this);
  req.print(doc, req, next);
}
