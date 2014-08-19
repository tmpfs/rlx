var template = require('../../util/template');
var treeify = template.treeify;

module.exports = function ls(info, req, next) {
  template.list.call(this, req, function(err, list, unique) {
    if(err) return next(err);
    var doc = treeify.call(this, unique, true);
    req.text = true;
    req.print(doc, req, next);
  })
}
