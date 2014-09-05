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
    var options = {dir: target};
    docs.collate.call(scope, options, req, function(err, results) {
      console.dir(results);
      var options = {
        list: results,
        map: collect(results, {})
      };
      console.dir(options);
      return next();
      docs.save.call(scope, options, info, req, function(err, doc) {
        //console.dir('docs save complete');
        //console.dir(doc);
        //cb(err, doc);
        req.print(doc, req, next);
      })
    })
  }

  if(!target) {
    return req.error(errors.ETOO_FEW_ARGUMENTS, req, next, ['<dir>']);
  }
  target = resolve(target);
  fs.stat(target, function(err, stats) {
    if(err || !stats || stats && !stats.isDirectory()) {
      return req.error(errors.EDIRECTORY_REQUIRED, req, next, [target]);
    }
    //console.log('docs/push');
    return updocs.call(scope);

    // collect all files
    files.walk(target, function(err, list) {
      if(err) return req.error(err, req, next);
      var options = {
        list: list,
        map: collect(list, {})
      };
      console.dir(options);
      next();
    })
  })
}
