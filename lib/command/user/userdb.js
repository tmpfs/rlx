var prefix = 'org.couchdb.user:';
module.exports.prefix = prefix;
module.exports.default = '_users';
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
