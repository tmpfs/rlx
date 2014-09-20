var url = require('url')
  , querystring = require('querystring')
  , wd
  , depth
  , dir;

var params = {
  server: ':server',
  database: ':db',
  id: ':docid',
  rev: ':rev',
}

/**
 *  Get a location string for display in an interactive prompt.
 */
function getPromptLocation(key, options) {
  var o = cwd()
    , s = o.server;
  if(!s) return '';
  var parts = (dir.parts || []).slice(0)
    , prefix = '';

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

  if(!s) return {path: [], parts: [], rev: r};

  var parts = [s, d, i];

  parts = parts.filter(function(s) {
    return s !== undefined;
  })

  // clean array of the component path
  var path = parts.slice(0);

  // sanitized version suitable for a prompt
  var uri = url.parse(s, true, true);
  s = path.length === 1 ? uri.host : uri.hostname;
  s = (s || '').replace(/\/+$/, '');

  if(parts[0]) parts[0] = s;
  if(parts[1]) parts[1] = querystring.escape(d);
  if(path[1]) path[1] = querystring.escape(d);

  if(u && parts.length) {
    parts[0] = u + '@' + uri.host;
  }

  //has id, drop off the server
  if(i || i && r) {
    parts.shift();
  }

  return {path: path, parts: parts, uri: uri, rev: r, source: o};
}

function getdir(opts) {
  opts = opts || {};
  var o = {}
    , uri;

  o.server = opts.server;
  o.database = opts.database;
  o.username = opts.username;
  o.id = opts.id;
  //o.ddoc = opts.ddoc;
  o.rev = opts.rev;

  if(o.database) {
    o.database = querystring.unescape(o.database);
  }

  // ensure we use the parsed hostname
  if(o.server) {
    uri = url.parse(o.server);
    o.server =
      (uri.protocol && uri.host)
        ? uri.protocol + '//' + uri.host : undefined;
  }

  o.dir = getParts(o);
  o.depth = o.dir.path.length - 1;

  var qs = {}, path = o.dir.path.slice(0);
  if(o.rev) {
    qs.rev = o.rev;
    path.pop();
  }

  var hasData = o.server || o.database || o.username || o.id || o.rev;

  if(path.length) {
    var nu = url.parse(path[0]);
    nu.query = qs;
    nu.pathname = [].concat(path.slice(1)).join('/');
    if(o.username) {
      nu.auth = o.username;
    }
    o.url = url.format(nu);
  }else if(!o.url){
    o.url = '/';
    if(hasData) {
      o.url = [
        o.server ? o.server : params.server,
        o.database ? o.database : params.database,
        o.id ? o.id : params.id
      ].join('/');
      if(o.rev) o.url += '?rev=' + o.rev;
    }

  }

  return o;
}

function stringify(o) {
  return getdir.call(this, o).url
}

/**
 *  Get private directory information.
 */
function cwdir() {
  return {dir: dir, depth: depth};
}

function chdir(opts) {
  opts = opts || {};
  var o = opts.force ? opts : {}
    , conf = this.configure();

  opts.username = opts.username || this.authuser || this.username;

  if(!opts.force) {
    opts.server = opts.server || this.server;
    opts.database = opts.server ? (opts.database || this.database) : undefined;
    opts.id = opts.database ? (opts.id || this.id) : undefined;
    //o.ddoc = o.database ? (opts.ddoc || this.ddoc) : undefined;
    opts.rev = opts.id ? (opts.rev || this.rev) : undefined;

    o = getdir.call(this, opts);
  }else{
    o = getdir.call(this, opts);
  }

  // ensure we use the parsed hostname
  if(o.server) {
    this.server = o.server;
  }

  // module level cache
  dir = o.dir;
  depth = o.depth;

  // drop back to root from ../ possibly
  // clear everything
  if(!dir.path.length && o.username) {
    delete o.username;
  }

  // clean internal info
  delete o.dir;
  delete o.depth;
  delete o.force;
  delete o.alias;

  conf.location = wd = o;

  return o;
}

function cwd() {
  return wd || {};
}

var location = {};
location.getdir = getdir;
location.cwd = cwd;
location.stringify = stringify;
location.chdir = chdir;
location.cwdir = cwdir;
location.getPromptLocation = getPromptLocation;

module.exports = location;
