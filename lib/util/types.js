var types = {
  json: 'json',
  js: 'js',
  text: 'text',
  unknown: 'unknown'
}, list = [];

function getByExtension(file, unknown) {
  if(/\.json$/.test(file)) {
    return types.json;
  }else if(/\.js$/.test(file)) {
    return types.js;
  }else if(/\.txt$/.test(file)) {
    return types.text;
  }
  return unknown || types.unknown;
}

module.exports = types;
Object.keys(types).forEach(function(key) {
  list.push(types[key]);
  module.exports[key.toUpperCase()] = types[key];
})
module.exports.list = list;
module.exports.getByExtension = getByExtension;
