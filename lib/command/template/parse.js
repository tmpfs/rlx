var fs = require('fs');
var template = require('../../util/template');

module.exports = function parse(info, req, next) {
  var scope = this, log = this.log, errors = this.errors;
  var verbose = this.verbose === true;
  var name = this.template;
  var print = require('../../util/print').bind(this);
  if(!name) {
    return next(this.errors.ETEMPLATE_OPTION);
  }
  template.list.call(this, req, function(err, list, unique) {
    if(err) return next(err);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return next(errors.EUNKNOWN_TEMPLATE, [name]);
    }
    if(Array.isArray(tpl)) {
      return next(errors.EAMBIGUOUS_TEMPLATE, [name]);
    }
    var file = tpl.file;
    // do not stringify javascript templates
    if(/\.js$/.test(file)) {
      req.text = true;
    }
    template.parse.call(this, file, req, function(err, doc) {
      print(doc, req, next);
    });
  })
}
