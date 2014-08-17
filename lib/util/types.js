var types = {
  json: 'json',
  js: 'js'
}, list = [];

module.exports = types;
Object.keys(types).forEach(function(key) {
  list.push(types[key]);
  module.exports[key.toUpperCase()] = types[key];
})
module.exports.list = list;
