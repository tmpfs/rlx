var alias = require('../../util/alias');

module.exports = function parse(info, req, next){
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }
  var doc = alias.parse.call(this, info.args[0]);
  req.print(doc, req, next);
}
