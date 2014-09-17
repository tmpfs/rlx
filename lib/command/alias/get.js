var alias = require('../../util/alias');

module.exports = function get(info, req, next){
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var aliases = this.configure().alias;
  if(aliases === false) {
    return req.error(
      this.errors.EALIAS_FILE_REQUIRED, req, next,
      [req.dirs.user.alias, 'alias init']);
  }
  var as = alias.strip(req, info.args[0]);
  var doc = alias.find.call(this, as, aliases);
  if(!doc) {
    return req.error(this.errors.EUNKNOWN_ALIAS, req, next, [as]);
  }
  req.print(doc || {}, req, next);
}
