var loc = require('../util/location');

function location() {
  var scope = this;
  return function getLocation(key, options) {
    return loc.getPromptLocation.call(scope, key, options);
  }
}

module.exports = location;
