var url = require('url')
  , querystring = require('querystring')
  , cdb = require('cdb')
  , merge = require('cli-util').merge
  , loc = require('./location')
  , alias = require('./alias')
  , re = {
    root: /^\/+$/,
    parent: /\.\./,
    dot: /\.\//,
    protocol: /^https?:\/\/.+/,
    dotprotocol: /^(\.*\/?)+(https?:\/\/.*)/
  },
  fields = [
    'server',
    'database',
    'id',
    'rev',
    'ddoc',
    'username'
  ];

function clear(opts) {
  opts = opts || {};
  delete this.database;
  delete this.id;
  delete this.rev;
  if(opts.server) {
    delete this.server;
  }
  if(opts.auth) {
    delete this.authuser;
    delete this.username;
  }
}

/**
 *  Expand single argument into path portions.
 */
function expand(path) {
  var uri = url.parse(path);

  // use server portion
  if(uri.protocol) {
    this.server = uri.protocol + '//' + uri.host;
  }

  // treat as db/document reference
  var pth = uri.pathname, parts;

  // no more path parts specified
  if(!pth || pth === '/') {
    clear.call(this);
  }else{
    clear.call(this);
    pth = pth.replace(/^\/+/, '').replace(/\/$/, '');
    parts = pth.split('/');
    if(parts[0]) this.database = parts[0];
    if(parts[1]) this.id = parts[1];
    if(parts[2]) this.rev = parts[2];
  }
}

/**
 *  Treat as relative to the current location.
 */
function dot(ptn) {
  var dir = loc.cwdir.call(this)
    , depth = dir.depth
    , p, args;

  if(ptn === './' || ptn === '.') {
    return loc.chdir.call(this);
  }

  //ptn = ptn.replace(re.dot, '');
  args = ptn.split('/');

  while(p = args.shift()) {
    field = fields[depth + 1];
    if(!field) break;
    this[field] = p;
    depth ++;
  }

  return loc.chdir.call(this);
}

/**
 *  Treat as a parent reference.
 */
function parent(ptn) {
  // cannot drop down any further
  if(!this.server) {
    return loc.chdir.call(this);
  }

  var parents = ptn.split('/'), p, dir, depth, field;
  parents = parents.filter(function(p) {
    return p;
  })

  dir = loc.cwdir.call(this);
  depth = dir.depth;
  while(p = parents.shift()) {
    field = fields[depth];
    if(p === '..') {
      delete this[field];
      depth--;
    }else if(p[0] && p[0] !== '..'){
      field = fields[depth + 1];
      this[field] = p;
    }
  }

  return loc.chdir.call(this);
}

function assign(alias) {
  clear.call(this);
  alias.force = true;
  return loc.chdir.call(this, alias);
}

function chdir(ptn, req, cb) {
  ptn = ptn || '';
  var u, parts, qs, res, a, as, k
    , owd = loc.cwd.call(this)
    , conf = this.configure();

  if(alias.test(req, ptn)){
    a = alias.strip(req, ptn);
    as = alias.find(a, this.configure().alias);
    if(as) {
      // no server, merge with the current location
      var merges = !as.server;
      alias.expand.assign.call(this, as, req.rc.alias.match);
      if(merges) {
        var tmp = merge(conf.location, {});
        as = merge(as, tmp);
      }

      // if a specific option was specified
      // it takes precedence
      for(k in fields) {
        k = fields[k];
        if(req.result.options[k]) {
          as[k] = req.result.options[k];
        }
      }
    }
  }

  if(a && !as) {
    return cb(this.wrap(this.errors.EUNKNOWN_ALIAS, [a]));
  }

  if(ptn && re.dotprotocol.test(ptn)) {
    ptn = ptn.replace(re.dotprotocol, '$2');
  }

  // no arguments, clear everything but server
  if(!ptn) {
    clear.call(this);
  // got an alias match
  }else if(as) {
    res = assign.call(this, as);
  // forward slash, clear everything
  }else if(re.root.test(ptn)) {
    clear.call(this, {server: true, auth: true})
    args = [];
  }else if(re.protocol.test(ptn)) {
    // clear everything but the server
    clear.call(this)
    u = url.parse(ptn, true, true);
    this.server = u.protocol + '//' + u.host;
    parts = (u.pathname || '').split('/').filter(function(s) {
      return s;
    })
    if(parts[0]) this.database = parts[0];
    if(parts[1]) this.id = parts[1];
    if(u.query && u.query.rev) {
      this.rev = u.query.rev;
    }
    if(u.auth) {
      this.username = u.auth.replace(/:.*$/, '');
    }
  }else if(re.parent.test(ptn)) {
    res = parent.call(this, ptn);
  }else{
    res = dot.call(this, ptn);
  }

  if(res && res.database && !cdb.util.db.valid(res.database)) {
    clear.call(this);
    return cb(this.wrap(
      this.errors.EILLEGAL_DATABASE_NAME, [res.database]),
      loc.chdir.call(this, owd));
  }

  if(!res) {
    res = loc.chdir.call(this);
  }

  // final assignment, ensures future commands
  // execute in this location context
  for(var k in res) {
    this[k] = res[k];
  }

  return cb(null, res);
}

module.exports = chdir;
