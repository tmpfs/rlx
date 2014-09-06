var fs = require('fs');
var docs = require('../../util/docs')
 , collect = docs.collect;
var resolve = require('../../util/resolve');
var files = require('../../util/files');

module.exports = function push(info, req, next) {
  if(!this.database) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var scope = this, errors = this.errors;
  var target = info.args[0];

  function updocs() {
    files.walk(target, function(err, files) {
      /* istanbul ignore if  */
      if(err) return req.error(err, req, next);
      var result = collect(files, {});

      //console.dir('docs collate request');
      //console.dir(result);

      docs.collate.call(scope, result, req, function(err, collated) {
        /* istanbul ignore if  */
        if(err) return req.error(err, req, next);
        var options = {
          list: result.files,
          map: result
        };
        //console.dir('docs save options');
        //console.dir(options);
        docs.save.call(scope, options, info, req, function(err, doc) {
          /* istanbul ignore if  */
          if(err) return req.error(err, req, next);
          req.print(doc, req, next);
        })
      });
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
