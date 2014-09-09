var fs = require('fs');
var docs = require('../../util/docs')
 , collect = docs.collect;
var resolve = require('../../util/resolve');
var files = require('../../util/files');
var direxists = require('../../util/direxists');

module.exports = function push(info, req, next) {
  var scope = this
    , errors = this.errors;

  if(!this.database) {
    return req.error(
      errors.EDATABASE_REQUIRED, req, next);
  }

  if(!info.args.length) {
    return req.error(
      errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  function updocs(target) {
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

  direxists.call(this, info.args[0], function(err, dir, stat) {
    if(err) return req.error(err, req, next);
    updocs.call(scope, dir);
  })
}
