var jar = require('../../jar');
var loc = require('../../util/location');

module.exports = function who(info, req, next) {
  var doc = {}, server, i;
  var servers = Object.keys(jar.cookie);
  for(i = 0;i < servers.length;i++) {
    server = servers[i];
    doc[server] = Object.keys(jar.cookie[server].list);
  }
  req.print(doc, req, next);
}
