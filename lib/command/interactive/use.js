var loc = require('../../util/location');
module.exports = function use(info, req, next) {
  var db = info.args[0]
    , server
    , id = info.args[2]
    , rev = info.args[3];

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
    if(db) this.database = db;
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
