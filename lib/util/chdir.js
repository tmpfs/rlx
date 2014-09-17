var cdb = require('cdb')
  , loc = require('./location');

function chdir(args) {
  var db = args[0]
    , server
    , id = args[2]
    , rev = args[3];

  var root = /^\/+$/.test('' + args[0]);

  if(root) {
    server = db = id = rev = undefined;
    this.server = null;
    delete this.authuser;
    delete this.username;
    args = [];
  }

  if(/^https?:\/\//.test(db)) {
    server = db;
    db = args[1];
  }else{
    server = args[1];
  }

  if(!args.length) {
    delete this.database;
    delete this.id;
    delete this.rev;
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
