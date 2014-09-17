var loc = require('../../util/location');

module.exports = function cd(info, req, next) {
  var doc = loc.cwdir.call(this, info.args);
  req.print(doc, req, next);
}
