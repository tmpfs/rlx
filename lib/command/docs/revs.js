var docs = require('../../util/docs');
module.exports = function revs(info, req, next) {
  var errors = this.errors
    , raw = this.raw
    , long = this.long
    , strict = this.strict;

  if(!this.database) {
    return req.error(errors.EDATABASE_REQUIRED, req, next);
  }

  if(!info.args.length) {
    return req.error(errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var opts = {ids: info.args, lenient: this.lenient};
  docs.revs(opts, info, req, function(err, doc) {
    if(err) return req.error(err, req, next);

    if(doc.err.length && strict) {
      return req.print(doc.err, req, next);
    }

    if(!raw) {
      if(!long) {
        return req.print(doc.map, req, next);
      }else{
        return req.print(doc.list, req, next);
      }
    }
    req.print(doc.result, req, next);
  })
}
