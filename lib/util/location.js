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
  var parts = (dir.parts || []).slice(0)
    , prefix = '';

  //console.dir(dir);

  if(dir.parts.length < dir.path.length) {
    prefix = '«';
  }
  return prefix + parts.join('/');
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
  s = path.length === 1 ? uri.host : uri.hostname;
  s = (s || '').replace(/\/+$/, '');

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

  //console.log('got username info %s', u);

  if(u && parts.length) {
    parts[0] = u + '@' + parts[0];
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

  if(o.database) {
    o.database = querystring.escape(querystring.unescape(o.database));
  }

  // ensure we use the parsed hostname
  if(o.server) {
    uri = url.parse(o.server);
    //console.dir(uri);
    this.server = o.server =
      (uri.protocol && uri.host)
        ? uri.protocol + '//' + uri.host : undefined;
  }

  dir = getParts(o);
  depth = dir.path.length - 1;

  var qs = {}, path = dir.path.slice(0);
  if(o.rev && o.id) {
    qs.rev = o.rev;
    path.pop();
  }

  if(path.length) {
    var nu = url.parse(path[0]);
    nu.query = qs;
    nu.pathname = [].concat(path.slice(1)).join('/');
    if(o.username) {
      nu.auth = o.username;
    }
    o.url = url.format(nu);
  }else{
    o.url = '/';
  }

  //console.log('path length %s', path.length);

  // drop back to root from ../ possibly
  // clear everything
  if(!path.length && o.username) {
    delete o.username;
  }

  conf.location = wd = o;
  return o;
}

function cwd() {
  return wd || {};
}

var location = {};
location.cwd = cwd;
location.chdir = chdir;
location.cwdir = cwdir;
location.getPromptLocation = getPromptLocation;

module.exports = location;
