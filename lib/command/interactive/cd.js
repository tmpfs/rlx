var cdb = require('cdb')
  , loc = require('../../util/location');
module.exports = function cd(info, req, next) {
  var db = info.args[0]
    , server
    , id = info.args[2]
    , rev = info.args[3];

  if(/^\/+$/.test('' + info.args[0])) {
    server = db = id = rev = undefined;
    this.server = null;
    delete this.username;
    info.args = [];
  }

  if(/^https?:\/\//.test(db)) {
    server = db;
    db = info.args[1];
  }else{
    server = info.args[1];
  }

  if(!info.args.length) {
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

  var doc = loc.cwd.call(this);

  // ensure we use the parsed hostname
  if(doc.server) {
    this.server = doc.server;
  }

  req.print(doc, req, next);
}
