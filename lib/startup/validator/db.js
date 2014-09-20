var cdb = require('cdb');

/**
 *  Determine if the database option is required for a command.
 *
 *  @param req The middleware request object.
 */
function database(req) {

  var whitelist = [
    this.commands().admin,
    this.commands().application,
    this.commands().attach,
    this.commands().bulk,
    this.commands().config,
    this.commands().database,
    this.commands().document,
    //this.commands().level,
    //this.commands().local,
    this.commands().replicate,
    this.commands().security,
    //this.commands().session,
    //this.commands().user,
    //this.commands().info,
    //this.commands().log,
    //this.commands().login,
    //this.commands().restart,
    //this.commands().stats,
    //this.commands().tasks,
    //this.commands().uuids,
    //this.commands().whoami,
  ];

  var unparsed = req.result.unparsed;
  var cmd = unparsed[0], c, p, t, s;

  // we always validate database when present
  if(!cmd) return true;

  for(i = 0;i < whitelist.length;i++) {
    c = whitelist[i];

    // some commands are dynamically deleted
    if(!c) continue;

    p = c.getParents();

    // interactive command has been deleted so need to remove parent
    if(c.parent() && c.parent().key() === 'interactive') {
      p.shift();
    }

    // top-level command match
    if(p.length === 1) {
      if(~c.names().indexOf(cmd)) {
        return true;
      }
    }else{
      t = c.parent().names();
      if(~t.indexOf(cmd) && ~c.names().indexOf(unparsed[1])) {
        return true;
      }
    }
  }

  return false;
}

function validate(req, next) {
  var db = '' + this.database;
  if(this.database
    && database.call(this, req)
    && !cdb.util.db.valid(this.database)) {
    console.dir(this.database);
    delete this.database;
    return req.error(
      this.errors.EILLEGAL_DATABASE_NAME, req, next, [db], true);
  }
  next();
}

module.exports = validate;
