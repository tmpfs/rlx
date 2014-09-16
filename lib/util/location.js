var url = require('url')
  , querystring = require('querystring'
  , wd;

function location(options) {
  options = options || {};
  var s = options.server || this.server
    , d = options.database || this.database
    , u = options.username || this.username
    , i = options.id || this.id
    , r = options.rev || this.rev;
  if(!s) return '';
  var uri = url.parse(s);
  var str = uri.protocol + '//';
  if(u) {
    str += u + '@';
  }
  str += uri.host;

  var parts = [d, i, r];
  parts = parts.filter(function(val) {
    return val;
  })

  if(parts.length) {
    str += '/' + parts.join('/');
  }
  return str;
}

function getPromptLocation(key, options) {
  var conf = this.configure();
  var s = options.server || this.server
    , d = options.database || this.database || ''
    , u = options.username || this.authuser || this.username;

  if(!s) return '';

  var max = 32, ellipsis = '...';
  s = s.replace(/\/+$/, '');
  var uri = url.parse(s);
  d = d ? '/' + querystring.escape(d) : '';
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

function chdir(options) {
  options = options || {};
  var o = {}
    , conf = this.configure();
  o.server = options.server || this.server;
  o.database = options.database || this.database;
  o.username = options.username || this.authuser || this.username;
  o.id = options.id || this.id;
  o.rev = options.rev || this.rev;
  o.ddoc = options.ddoc || this.ddoc;
  conf.location = wd = o;
  return o;
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
