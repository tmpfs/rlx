module.exports = function rm(info, req, next) {
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }
  var opts = req.db.options(req, {db: info.args[0]});
  var dbh = req.db();
  dbh.db.rm(opts, function(err, res, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
