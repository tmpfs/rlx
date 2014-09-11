var url = require('url');

function location(options) {
  options = options || {};
  var s = options.server || this.server;
  var d = options.database || this.database;
  var u = options.username || this.username;

  return server + '/' + database;
}

function getPromptLocation(key, options) {
  var scope = this;
  var server = scope.server;
  var max = 32, ellipsis = '...';
  if(!server) return null;
  server = server.replace(/\/+$/, '');
  var u = url.parse(server);
  var d = scope.database ? '/' + scope.database : '';
  var s = u.hostname + d;
  //console.dir(u);
  if(scope.username) {
    s = scope.username + '@' + u.hostname + d;
  }
  if(s.length > max) {
    s = s.substr(0, max - ellipsis.length) + ellipsis;
  }
  return s;
}

location.getPromptLocation = getPromptLocation;

module.exports = location;
