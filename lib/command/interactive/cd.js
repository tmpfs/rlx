var chdir = require('../../util/chdir');

module.exports = function cd(info, req, next) {
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  chdir.call(this, info.args[0], req, function(err, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  });
}
