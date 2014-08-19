var cdb = require('cdb');
var prefix = module.exports.prefix = cdb.user.prefix;
module.exports.default = cdb.user.db;
module.exports.id = function(id) {
  id = id || '';
  if(id.indexOf(prefix) !== 0) {
    id = prefix + id;
  }
  return !id ? null : id;
}
module.exports.strip = function(id) {
  id = id || '';
  if(id.indexOf(prefix) === 0) {
    id = id.replace(prefix, '');
  }
  return !id ? null : id;
}
