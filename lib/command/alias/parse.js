var alias = require('../../util/alias');

module.exports = function init(info, req, next){
  var doc = alias.parse.call(this, info.args[0]);
  req.print(doc, req, next);
}
