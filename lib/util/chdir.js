var url = require('url')
  , cdb = require('cdb')
  , loc = require('./location')
  , re = {
    root: /^\/+$/,
    parent: /\.\./,
    protocol: /^https?:\/\//
  },
  fields = [
    'server',
    'database',
    'id',
    'rev'
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

  //console.dir(uri);

  // use server portion
  if(uri.protocol) {
    this.server = uri.protocol + '//' + uri.hostname;
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

function setParent(args) {

  // cannot drop down any further
  if(!this.server) {
    return loc.chdir.call(this);
  }

  // find first arg with a parent pattern
  var i, path;
  for(i = 0;i < args.length;i++) {
    if(re.parent.test(args[i])) {
      path = args[i];
      break;
    }
  }

  var parents = path.split('/'), p, dir, depth, field;
  parents = parents.filter(function(p) {
    return p;
  })

  dir = loc.cwdir.call(this);
  depth = dir.depth;
  while(p = parents.pop()) {
    field = fields[depth];
    delete this[field];
    depth--;
  }

  return loc.chdir.call(this);
}

function chdir(args) {
  var db = args[0]
    , server
    , id = args[2]
    , rev = args[3];

  var root = re.root.test('' + args[0]);
  if(root) {
    clear.call(this, {server: true, auth: true})
    args = [];
  }else if(re.parent.test(args.join(' '))) {
    return setParent.call(this, args);
  }

  if(re.protocol.test(db)) {
    server = db;
    db = args[1];
  }else{
    server = args[1];
  }

  if(!args.length) {
    clear.call(this);
  }else if(args.length === 1) {
    expand.call(this, args[0])
  }else{
    if(server) this.server = server;
    if(db) {
      if(!cdb.util.db.valid(db)) {
        return req.error(
          this.errors.EILLEGAL_DATABASE_NAME, req, next, [db], true);
      }
      this.database = db;
    }
    if(id) this.id = id;
    if(rev) this.rev = rev;
  }

  return loc.chdir.call(this);
}

module.exports = chdir;
