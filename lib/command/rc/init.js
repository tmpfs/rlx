var fs = require('fs');
var path = require('path');

var resolve = require('../../util/resolve');
var copy = require('../../util/copy');

module.exports = function init(info, req, next){
  var scope = this, errors = this.errors;
  var target = info.args[0];
  var name = req.runcontrol.name;
  var src = path.join(req.dirs.base, name);
  var options = {ncp: {clobber: this.force}, source: src};
  if(!target) {
    options.destination = path.join(req.dirs.user.home, name);
    copy.call(this, info, req, next, options);
  }else{
    target = resolve(target);
    fs.stat(target, function(err, stats) {
      if(err || !stats || stats && !stats.isDirectory()) {
        return req.error(errors.EDIRECTORY_REQUIRED, req, next, [target]);
      }
      options.destination = path.join(target, name);
      copy.call(scope, info, req, next, options);
    })
  }
}
