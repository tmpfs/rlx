var prompt = require('../../prompt');

module.exports = function rm(info, req, next) {
  if(!info.args.length && !this.database) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }
  var opts = req.db.options(req, {db: info.args[0] || this.database});
  var dbh = req.db();
  prompt.rm.call(this, info, req, {id: opts.db}, function(err, res) {
    if(err) return req.error(err, req, next);
    if(res.accept !== true) return next();
    dbh.db.rm(opts, function(err, res, doc) {
      if(err) return req.error(err, req, next);
      req.print(doc, req, next);
    })
  })
}
