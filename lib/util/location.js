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

  dir = getParts(o);
  depth = dir.path.length;

  //console.dir(dir);

  o.url = !dir.path.length ? '/' : dir.path.join('/');

  conf.location = wd = o;
  return o;
}

function cwd() {
  return wd;
}

var location = {};
location.cwd = cwd;
location.chdir = chdir;
location.getPromptLocation = getPromptLocation;

module.exports = location;
