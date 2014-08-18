var cli = require('cli-command');

module.exports = function limit(info, req, next) {
  var print = require('../../util/print').bind(this);
  var opts = {db: this.database};
  if(info.args[0]) opts.limit = info.args[0];
  if(opts.limit) {
    opts.limit = parseInt(opts.limit);
    if(isNaN(opts.limit)) {
      return next('invalid %s, must be an integer', ['limit']);
    }
  }
  var dbh = req.db();
  dbh.db.limit(opts, function(err, res, doc) {
    if(req.auth(info, req, err, dbh)) {
      return;
    }
    req.db.add(req, err, res, opts, doc);
    if(err) return req.error(err, next);
    print(doc, req, next);
  })
}
