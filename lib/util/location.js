var url = require('url')
  , querystring = require('querystring')
  , wd
  , depth
  , dir;

/**
 *  Get a location string for display in an interactive prompt.
 */
function getPromptLocation(key, options) {
  var o = cwd()
    , s = o.server;
  if(!s) return '';
  var parts = dir.parts || [];
  return parts.join('/');
}

/**
 *  Get all path parts and an alternative representation
 *  for display in the interactive prompt dropping off items
 *  as the depth increases.
 */
function getParts(o) {
  var s = o.server
    , d = o.database
    , u = o.username
    , i = o.id
    , r = o.rev;

  if(!s) return {path: [], parts: []};

  var parts = [s, d, i, r];

  parts = parts.filter(function(s) {
    return s;
  })

  var path = parts.slice(0);

  var uri = url.parse(s);
  s = uri.hostname;
  //console.dir(s);
  s = (s || '').replace(/\/+$/, '');
  if(u) {
    s = u + '@' + s;
  }
  if(d) d = querystring.escape(d);

  if(parts[0]) parts[0] = s;
  if(parts[1]) parts[1] = d;
  if(path[1]) path[1] = d;

  //has id, drop off the server
  if(parts.length > 2) {
    parts.shift();

    // has id and rev, drop off database
    if(parts.length > 2) {
      parts.shift();
    }
  }

  return {path: path, parts: parts, uri: uri};
}

/**
 *  Get private directory information.
 */
function cwdir() {
  return {dir: dir, depth: depth};
}

function chdir(options) {
  options = options || {};
  var o = {}
    , uri
    , conf = this.configure();

  o.server = options.server || this.server;
  o.database = o.server ? (options.database || this.database) : undefined;
  o.username = options.username || this.authuser || this.username;
  o.id = o.database ? (options.id || this.id) : undefined;
  //o.ddoc = o.database ? (options.ddoc || this.ddoc) : undefined;
  o.rev = o.id ? (options.rev || this.rev) : undefined;

  // ensure we use the parsed hostname
  if(o.server) {
    uri = url.parse(o.server);
    this.server = o.server =
      (uri.protocol && uri.hostname)
        ? uri.protocol + '//' + uri.hostname : undefined;
  }

  dir = getParts(o);
  depth = dir.path.length - 1;

  var qs = {}, path = dir.path.slice(0);
  if(o.rev && o.id) {
    qs.rev = o.rev;
    path.pop();
  }

  o.url = !path.length ? '/' : path.join('/');

  if(Object.keys(qs).length) {
    o.url += '?' + querystring.stringify(qs);
  }

  conf.location = wd = o;

  return o;
}

function cwd() {
  return wd;
}

var location = {};
location.cwd = cwd;
location.chdir = chdir;
location.cwdir = cwdir;
location.getPromptLocation = getPromptLocation;

module.exports = location;
