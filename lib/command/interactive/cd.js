var chdir = require('../../util/chdir');

module.exports = function cd(info, req, next) {
  var doc = chdir.call(this, info.args);
  req.print(doc, req, next);
}
