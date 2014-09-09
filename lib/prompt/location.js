var url = require('url');

function location() {
  var scope = this;
  return function getLocation(key, options) {
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
}

module.exports = location;
