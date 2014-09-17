var url = require('url')
  , cdb = require('cdb')
  , loc = require('./location');

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

function chdir(args) {
  var db = args[0]
    , server
    , id = args[2]
    , rev = args[3];

  var root = /^\/+$/.test('' + args[0]);

  if(root) {
    //server = db = id = rev = undefined;
    //this.server = null;
    //delete this.authuser;
    //delete this.username;
    clear.call(this, {server: true, auth: true})
    args = [];
  }

  if(/^https?:\/\//.test(db)) {
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

  var doc = loc.chdir.call(this);

  // ensure we use the parsed hostname
  if(doc.server) {
    this.server = doc.server;
  }

  return doc;
}

module.exports = chdir;
