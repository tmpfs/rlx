var fs = require('fs');
var docs = require('../../util/docs')
 , collect = docs.collect;
var resolve = require('../../util/resolve');
var files = require('../../util/files');

module.exports = function ls(info, req, next) {
  var scope = this, errors = this.errors, long = this.long;
  var target = info.args[0];

  function updocs() {
    files.walk(target, function(err, files) {
      /* istanbul ignore if  */
      if(err) return req.error(err, req, next);
      var result = collect(files, {});
      if(!long) {
        return req.print(result.documents, req, next);
      }
      // long listing, collate documents
      docs.collate.call(scope, result, req, function(err, collated) {
        /* istanbul ignore if  */
        if(err) return req.error(err, req, next);
        var k, fo, docs = [], item;
        for(k in result.documents) {
          fo = result.documents[k];
          if(fo.document) {
            item =
              {
                doc: fo.document,
                id: fo.id,
                file: fo.file,
                name: fo.name,
                path: fo.path,
                attachments: fo.attachments};
            docs.push(item);
          }
        }

        req.print(docs, req, next);
    })
  }

  if(!target) {
    return req.error(errors.ETOO_FEW_ARGUMENTS, req, next, ['<dir>']);
  }

  target = resolve(target);
  //console.log('list with %s', target);
  fs.stat(target, function(err, stats) {
    if(err || !stats || stats && !stats.isDirectory()) {
      return req.error(errors.EDIRECTORY_REQUIRED, req, next, [target]);
    }
    updocs.call(scope);
  })
}
