var fs = require('fs');
var resolve = require('./resolve');

function direxists(target, cb) {
  var scope = this, wrap = this.wrap, errors = this.errors;
  target = resolve(target);
  fs.stat(target, function(err, stats) {
    if(err || !stats || stats && !stats.isDirectory()) {
      return cb.call(scope, wrap(errors.EDIRECTORY_REQUIRED, [target]));
    }
    cb.call(scope, null, target, stats);
  })
}

module.exports = direxists;
