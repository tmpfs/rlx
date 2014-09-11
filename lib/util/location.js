var url = require('url');

function location(options) {
  options = options || {};
  var s = options.server || this.server
    , d = options.database || this.database
    , u = options.username || this.username;

  return s + '/' + d;
}

function getPromptLocation(key, options) {
  var s = options.server || this.server
    , d = options.database || this.database || ''
    , u = options.username || this.username;

  if(!s) return null;

  var max = 32, ellipsis = '...';
  s = s.replace(/\/+$/, '');
  var uri = url.parse(s);
  d = d ? '/' + d : '';
  var str = uri.hostname + d;
  //console.dir(u);
  if(u) {
    str = u + '@' + uri.hostname + d;
  }
  if(str.length > max) {
    str = str.substr(0, max - ellipsis.length) + ellipsis;
  }
  return str;
}

function cwd(options) {
  options = options || {};
  var o = {};
  o.server = options.server || this.server;
  o.database = options.database || this.database;
  o.username = options.username || this.username;
  o.id = options.id || this.id;
  o.rev= options.rev || this.rev;
  if(o.server) {
    var uri = url.parse(o.server);
    o.server = uri.protocol + '//' + uri.host;
  }
  //console.log('cwd db: %s', o.database);
  return o;
}

location.cwd = cwd;
location.getPromptLocation = getPromptLocation;

module.exports = location;
