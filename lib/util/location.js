var url = require('url')
  , querystring = require('querystring')
  , wd
  , depth
  , dir;

var params = {
  server: '{server}',
  database: '{db}',
  id: '{docid}',
  rev: '{rev}',
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
    o.database = querystring.escape(querystring.unescape(o.database));
  }

  // ensure we use the parsed hostname
  if(o.server) {
    uri = url.parse(o.server);
    //console.dir(uri);
    o.server =
      (uri.protocol && uri.host)
        ? uri.protocol + '//' + uri.host : undefined;
  }

  var hasData = o.server || o.database || o.username || o.id || o.rev;

  o.dir = getParts(o);
  o.depth = o.dir.path.length - 1;

  var qs = {}, path = o.dir.path.slice(0);
  if(o.rev && o.id) {
    qs.rev = o.rev;
    path.pop();
  }

  //console.dir(o.dir);

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
    if(hasData) {
      //console.dir(o);
      o.url = [
        o.server ? o.server : params.server,
        o.database ? o.database : params.database,
        o.id ? o.id : params.id,
        o.rev ? o.rev : params.rev,
      ].join('/');
    }
  }

  return o;
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

  if(!opts.force) {
    opts.server = opts.server || this.server;
    opts.database = opts.server ? (opts.database || this.database) : undefined;
    opts.username = opts.username || this.authuser || this.username;
    opts.id = opts.database ? (opts.id || this.id) : undefined;
    //o.ddoc = o.database ? (opts.ddoc || this.ddoc) : undefined;
    opts.rev = opts.id ? (opts.rev || this.rev) : undefined;

    o = getdir.call(this, opts);
  }else{
    o.dir = getParts(o);
    o.depth = o.dir.path.length - 1;
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
location.chdir = chdir;
location.cwdir = cwdir;
location.getPromptLocation = getPromptLocation;

module.exports = location;
