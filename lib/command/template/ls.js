var dirs = require('./dirs');
var template = require('../../util/template');
var treeify = template.treeify;

module.exports = function ls(info, req, next) {
  var raw = this.raw;
  var opts = {
    patterns: this.glob.length ? this.glob : null,
    dirs: dirs.call(this, req)
  };
  //console.log('listing templates');
  template.list.call(this, req, opts, function(err, list, unique) {
    if(err) return req.error(err, req, next);
    var doc = !raw ? unique : treeify.call(this, unique, raw);
    req.text = raw;
    //console.dir(doc);
    req.print(doc, req, next);
  })
}
