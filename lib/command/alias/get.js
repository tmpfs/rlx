var alias = require('../../util/alias');

module.exports = function get(info, req, next){
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }
  var doc = alias.find.call(this, info.args[0], this.configure().alias);
  req.print(doc || {}, req, next);
}
