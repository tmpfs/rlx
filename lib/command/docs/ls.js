var fs = require('fs');
var docs = require('../../util/docs')
 , collect = docs.collect;
var resolve = require('../../util/resolve');
var files = require('../../util/files');

module.exports = function ls(info, req, next) {
  var scope = this, errors = this.errors, long = this.long, flat = this.flat;
  var target = info.args[0];

  function updocs() {
    files.walk(target, function(err, files) {
      /* istanbul ignore if  */
      if(err) return req.error(err, req, next);
      var result = collect(files, {});
      if(!long) {
        if(flat) {
          result.flat = flat;
          var collator = docs.collate.call(scope, result, req);
          collator.files(function(err, files) {
            return req.print(result.documents, req, next);
          });
        }else{
          return req.print(result.documents, req, next);
        }
      }
      // long listing, collate documents
      docs.collate.call(scope, result, req, function(err, collated) {
        /* istanbul ignore if  */
        if(err) return req.error(err, req, next);
        req.print(result.documents, req, next);
      })
    })
  }

  if(!target) {
    return req.error(errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  target = resolve(target);
  fs.stat(target, function(err, stats) {
    if(err || !stats || stats && !stats.isDirectory()) {
      return req.error(errors.EDIRECTORY_REQUIRED, req, next, [target]);
    }
    updocs.call(scope);
  })
}
