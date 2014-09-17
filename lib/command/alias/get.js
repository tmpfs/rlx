var alias = require('../../util/alias');

module.exports = function get(info, req, next){
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var aliases = this.configure().alias;
  if(aliases === false) {
    this.log.warn('%s does not exist, run %s',
      req.dirs.user.alias, 'alias init');
  }
  var doc = alias.find.call(this, info.args[0], aliases);
  req.print(doc || {}, req, next);
}
