var path = require('path');
var extensions = ['json', 'js'];

function hasExtension(name) {
  var i, nm, full;
  for(i = 0;i < extensions.length;i++) {
    full = path.basename(name);
    nm = path.basename(name, '.' + extensions[i]);
    if(nm !== full) {
      return true;
    }
  }
  return false;
}

function find(name, list) {
  var results = [], i, resolved;
  var ext = hasExtension(name);
  if(ext) {
    return list[name];
  }else{
    for(i = 0;i < extensions.length;i++) {
      resolved = name + '.' + extensions[i];
      if(list[resolved]) {
        results.push(list[resolved]);
      }
    }
    if(results.length === 1) return results[0];
    // ambiguous reference, returns array of templates
    return results;
  }
}

module.exports = {
  list: require('./list'),
  parse: require('./parse'),
  extensions: extensions,
  find: find
}
