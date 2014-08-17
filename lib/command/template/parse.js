var fs = require('fs');
var template = require('../../util/template');

module.exports = function parse(info, req, next) {
  var print = require('../../util/print').bind(this);
  var name = this.template;
  if(!name) {
    return next(this.errors.ETEMPLATE_OPTION);
  }
  template.list.call(this, req, function(err, list, unique) {
    if(err) return next(err);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return next(errors.EUNKNOWN_TEMPLATE, [name]);
    }
    template.parse.call(this, tpl.file, req, function(err, doc) {
      print(doc, req, next);
    });
  })
}
