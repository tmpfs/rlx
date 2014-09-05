var dirs = require('./dirs');
var template = require('../../util/template');
var design = require('../../util/design');

module.exports = function parse(info, req, next) {
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

  function parseFile(file) {
    template.parse.call(this, file, req, function(err, doc) {
      if(err) return req.error(err, req, next);
      req.print(doc, req, next);
    });
  }

  function parseDirectory(dir) {
    function cb(err, result) {
      if(err) return req.error(err, req, next);
      if(result.design) {
        if(result.attachments) {
          result.design.attachments = result.attachments;
        }
        if(result.docs) {
          result.design.docs = result.docs;
        }
      }
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

    //design.get.call(this, name, info, req, function(err, result) {
      //if(err) return req.error(err, req, next);
      //if(result.design) {
        //if(result.attachments) {
          //result.design.attachments = result.attachments;
        //}
        //if(result.docs) {
          //result.design.docs = result.docs;
        //}
      //}
      //req.print(result.design, req, next);
    //})
  }

  template.fsref.call(this, {name: name}, function(doc) {
    if(doc.exists && doc.stat) {
      if(doc.stat.isFile()) {
        return parseFile.call(scope, doc.file)
      }else if(doc.stat.isDirectory()){
        return parseDirectory.call(scope, doc.file);
      }
    }
    template.list.call(scope, req, opts, function(err, list, unique) {
      if(err) return req.error(err, req, next);
      var tpl = template.find(name, unique);
      var keys = Object.keys(unique);
      if(isDesign && !keys.length || !tpl && !isDesign) {
        return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
      }

      if(tpl) {
        parseFile.call(scope, tpl.file);
      }else if(isDesign) {
        parseDirectory.call(scope);
      }else{
        // should never get here
        next();
      }
    })
  });

}
