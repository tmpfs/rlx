var property = require('cli-property')
  , find = property.find;

module.exports = function get(info, req, next){
  var target = req.rc;
  var key = info.args[0];
  if(!key) {
    return req.error(this.errors.ERC_KEY_REQUIRED, req, next);
  }
  var result = find(key, target);
  req.print(result.value, req, next);
}
