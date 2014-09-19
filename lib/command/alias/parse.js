var alias = require('../../util/alias');

module.exports = function parse(info, req, next){
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }
  var as = alias.strip(req, info.args[0]);
  var doc = alias.parse.call(this, as);
  req.print(doc, req, next);
}
