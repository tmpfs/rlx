var fs = require('fs');
var docs = require('../../util/docs')
 , collect = docs.collect;
var resolve = require('../../util/resolve');
var files = require('../../util/files');
var direxists = require('../../util/direxists');

module.exports = function ls(info, req, next) {
  var scope = this
    , errors = this.errors
    , lenient = this.lenient
    , strict = this.strict
    , long = this.long
    , flat = this.flat;

  if(!info.args.length) {
    return req.error(errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var target = info.args[info.args.length - 1];
  var opts = {
    ids: info.args, lenient: lenient, strict: strict, flat: flat, long: long};

  function lslocal(target) {
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

  function lsremote() {
    // print remote documents
    docs.get.call(scope, opts, info, req, function(err, doc) {
      /* istanbul ignore if  */
      if(err) return req.error(err, req, next);
      opts.docs = doc.docs;
      docs.deconstruct.call(scope, opts, info, req, function(err, doc) {
        /* istanbul ignore if  */
        if(err) return req.error(err, req, next);
        //console.dir(doc);
        req.print(doc.files, req, next);
      })
    });
  }

  if(info.args.length === 1) {
    direxists.call(this, target, function(err, dir, stat) {
      if(err) return req.error(err, req, next);
      lslocal.call(scope, dir);
    })
  }else{
    lsremote.call(scope);
  }
}
