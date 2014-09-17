var alias = require('../../util/alias');
var stringify = require('../../util/stringify');
var write = require('../../util/write');
var prompt = require('../../prompt');

module.exports = function rm(info, req, next){
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }
  var aliases = this.configure().alias
    , file = req.dirs.user.alias;
  if(aliases === false) {
    return req.error(
      this.errors.EALIAS_FILE_REQUIRED, req, next,
      [file, 'alias init']);
  }
  var as = alias.strip(req, info.args[0]);
  var doc = alias.find.call(this, as, aliases);
  if(!doc) {
    return req.error(this.errors.EUNKNOWN_ALIAS, req, next, [as]);
  }

  doc = {alias: doc};
  doc.file = file;
  delete aliases[as];
  var opts = {output: file};
  prompt.rm.call(this, info, req, {id: as}, function(err, res) {
    if(err) return req.error(err, req, next);
    if(res.accept !== true) return next();
    var contents = stringify(aliases, null, req.rc.indent);
    write.call(this, contents, req, opts, function(err) {
      if(err) return req.error(err, req, next);
      doc.ok = true;
      req.print(doc, req, next);
    })
  });
}
