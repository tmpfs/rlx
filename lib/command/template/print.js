var fs = require('fs');
var dirs = require('./dirs');
var template = require('../../util/template');
var design = require('../../util/design');

module.exports = function print(info, req, next) {
  var scope = this, errors = this.errors, name = this.template || info.args[0];
  if(!name) {
    return req.error(errors.ETEMPLATE_REQUIRED, req, next);
  }
  var isDesign = design.matches(name);
  if(isDesign) {
    this.glob.push(name + design.glob.wildcard);
  }
  var opts = {
    patterns: this.glob.length ? this.glob : null,
    dirs: dirs.call(this, req)
  };

  function printDirectory(dir) {
    function cb(err, result) {
      if(err) return req.error(err, req, next);
      if(!dir) {
        req.print(result.design, req, next);
      }else{
        design.collate.call(this, {file: dir}, req, function(err, result) {
          if(err) return req.error(err, req, next);
          req.print(result.design, req, next);
        })
      }
    }
    var method = dir ? design.directory : design.get;
    var args = dir ? [dir, req, cb] : [name, info, req, cb]
    method.apply(this, args);
  }

  function printFile(tpl) {
    return req.print(fs.createReadStream(tpl.file), req, next);
  }

  template.fsref.call(this, {name: name}, function(doc) {

    // deal with file system references
    if(doc.exists && doc.stat) {
      if(doc.stat.isFile()) {
        return printFile.call(scope, {file: doc.file})
      }else if(doc.stat.isDirectory()){
        return printDirectory.call(scope, doc.file);
      }
    }

    // lookup template reference
    template.list.call(scope, req, opts, function(err, list, unique) {
      if(err) return req.error(err, req, next);
      var tpl = template.find(name, unique);
      var keys = Object.keys(unique);
      if(isDesign && !keys.length || !tpl && !isDesign) {
        return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
      }
      if(tpl) {
        return printFile.call(scope, tpl);
      }else if(isDesign) {
        return printDirectory.call(scope);
      }else{
        // should never get here
        next();
      }
    })
  });
}
