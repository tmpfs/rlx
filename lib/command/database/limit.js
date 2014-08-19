var cli = require('cli-command');

module.exports = function limit(info, req, next) {
  var opts = {db: this.database};
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  if(info.args[0]) opts.limit = info.args[0];
  if(opts.limit) {
    opts.limit = parseInt(opts.limit);
    if(isNaN(opts.limit)) {
      return next('invalid %s, must be an integer', ['limit']);
    }
  }
  var dbh = req.db();
  dbh.db.limit(opts, function(err, res, doc) {
    if(req.auth(info, req, err)) {
      return;
    }
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
