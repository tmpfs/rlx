var fs = require('fs');
var template = require('../../util/template');

module.exports = function get(info, req, next) {
  var scope = this, log = this.log, errors = this.errors;
  var verbose = this.verbose === true;
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
    if(Array.isArray(tpl)) {
      return next(errors.EAMBIGUOUS_TEMPLATE, [name]);
    }
    var file = tpl.file;
    fs.createReadStream(file).pipe(process.stdout);
    next();
  })
}
