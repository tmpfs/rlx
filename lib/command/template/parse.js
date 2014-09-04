var template = require('../../util/template');
var design = require('../../util/design');

module.exports = function parse(info, req, next) {
  var errors = this.errors, name = this.template || info.args[0];
  if(!name) {
    return req.error(errors.ETEMPLATE_REQUIRED, req, next);
  }
  var isDesign = design.matches(name);
  if(isDesign) {
    this.glob.push(name + design.glob.wildcard);
  }
  var opts = {patterns: this.glob.length ? this.glob : null};
  template.list.call(this, req, opts, function(err, list, unique) {
    if(err) return req.error(err, req, next);
    var tpl = template.find(name, unique);
    var keys = Object.keys(unique);
    if(isDesign && !keys.length || !tpl && !isDesign) {
      return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
    }

    if(tpl) {
      template.parse.call(this, tpl.file, req, function(err, doc) {
        req.print(doc, req, next);
      });
    }else if(isDesign) {
      design.get.call(this, name, info, req, function(err, result) {
        if(err) return req.error(err, req, next);
        if(result.design) {
          if(result.attachments) {
            result.design.attachments = result.attachments;
          }
          if(result.docs) {
            result.design.docs = result.docs;
          }
        }
        req.print(result.design, req, next);
      })
    }else{
      // should never get here
      next();
    }
  })
}
