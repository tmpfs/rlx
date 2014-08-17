var types = {
  json: 'application/json',
  text: 'text/plain',
  javascript: [
    'application/javascript', 'text/javascript', 'application/x-javascript']
}

module.exports = types;
var list = [];
Object.keys(types).forEach(function(key) {
  if(Array.isArray(types[key])) {
    list = list.concat(types[key]);
  }else{
    list.push(types[key]);
  }
  module.exports[key.toUpperCase()] =
    Array.isArray(types[key]) ? types[key][0]  : types[key];
})
module.exports.list = list;
