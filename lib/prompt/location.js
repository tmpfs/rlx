var loc = require('../util/location')
  , url = require('url');

function location() {
  var scope = this;
  return function getLocation(key, options) {
    return loc.getPromptLocation.call(scope, key, options);
  }
}

function authenticate() {
  var scope = this;
  return function(key, options) {
    if(!scope.server) return '';
    var u = url.parse(scope.server);
    u.auth = scope.username;
    u.protocol = '';
    return url.format(u).replace(/^\/+/, '').replace(/\/+$/, '');
  }
}

function health() {
  var scope = this;
  return function health(key, options) {
    if(!scope.server) return '';
    //return '☯';
    // u2600: ☀ ☁ ☂ ☃ ☄ ★ ☆ ☇ ☈ ☉ ☊ ☋ ☌ ☍ ☎ ☏ ☐ ☑ ☒ ☓ ☔ ☕ ☖ ☗ ☘ ☙ ☚ ☛ ☜ ☝ ☞ ☟
    // u2620: ☠ ☡ ☢ ☣ ☤ ☥ ☦ ☧ ☨ ☩ ☪ ☫ ☬ ☭ ☮ ☯ ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷ ☸ ☹ ☺ ☻ ☼ ☽ ☾ ☿
    //return '☆';
    //return '⌛';
    //
    //⩆ ⩇
    //
    //return '☀';
    //return '⊗';
    //return '⁕';
    return '⌘';
  }
}

location.authenticate = authenticate;
location.health = health;

module.exports = location;
