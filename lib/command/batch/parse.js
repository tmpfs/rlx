var load = require('../../util/batch').load;

module.exports = function parse(info, req, next) {
  var scope = this
    , errors = this.errors
    , long = this.long;

  if(!info.args.length) {
    return req.error(
      errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var opts = {files: info.args.slice(0), include: long};
  load(opts, function(err, doc) {
    if(err) return req.error(err, req, next);
    req.print(doc, req, next);
  })
}
