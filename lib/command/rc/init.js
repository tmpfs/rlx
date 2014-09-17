var fs = require('fs');
var path = require('path');

var copy = require('../../util/copy');
var direxists = require('../../util/direxists');

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
    direxists.call(this, target, function(err, dir, stat) {
      if(err) return req.error(err, req, next);
      options.destination = path.join(dir, name);
      copy.call(scope, info, req, next, options);
    })
  }
}
