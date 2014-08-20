var fs = require('fs');
var template = require('../../util/template');

module.exports = function get(info, req, next) {
  var errors = this.errors, name = this.template;
  if(!name) {
    return req.error(errors.ETEMPLATE_REQUIRED, req, next);
  }
  template.list.call(this, req, function(err, list, unique) {
    if(err) return req.error(err, req, next);
    var tpl = template.find(name, unique);
    if(!tpl) {
      return req.error(errors.EUNKNOWN_TEMPLATE, req, next, [name]);
    }
    req.print(fs.createReadStream(tpl.file), req, next);
  })
}
