var docs = require('../../util/docs');
module.exports = function revs(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }

  var raw = this.raw
    , long = this.long;

  //console.dir(req.result);

  var scope = this, errors = this.errors;
  if(!info.args.length) {
    return req.error(
      errors.ETOO_FEW_ARGUMENTS, req, next, ['<id ...>']);
  }
  var opts = {ids: info.args, lenient: this.lenient};
  docs.revs(opts, info, req, function(err, doc) {
    if(err) return req.error(err, req, next);
    if(!raw) {
      //var collated = {};
      if(!long) {
        return req.print(doc.map, req, next);
      }else{
        return req.print(doc.list, req, next);
      }
    }
    req.print(doc.result, req, next);
  })
}
