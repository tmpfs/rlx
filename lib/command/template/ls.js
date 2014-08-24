var template = require('../../util/template');
var treeify = template.treeify;

module.exports = function ls(info, req, next) {
  var raw = this.raw;
  template.list.call(this, req, function(err, list, unique) {
    if(err) return req.error(err, req, next);
    var doc = !raw ? unique : treeify.call(this, unique, raw);
    req.text = raw;
    req.print(doc, req, next);
  })
}
