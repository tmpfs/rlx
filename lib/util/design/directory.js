var fs = require('fs');
var path = require('path');
var resolve = require('../resolve');
var fileobject = require('../file-object');
var index = require('./collator/config').index;

function directory(dir, req, cb) {
  var scope = this, errors = this.errors, wrap = this.wrap;
  dir = resolve(dir);
  var file = fileobject(dir, path.dirname(dir));
  //console.dir(file);
  fs.exists(file.file, function(exists) {
    if(!exists) return cb.call(scope, wrap(errors.ENO_INPUT, [file.file]));
    fs.stat(file.file, function(err, stats) {
      if(err) return cb.call(scope, err);
      if(!stats.isDirectory()) {
        return cb.call(scope, wrap(errors.EDIRECTORY_REQUIRED, [file.file]));
      }
      var indexfile = path.join(dir, index);
      fs.exists(indexfile, function(exists) {
        if(!exists) return cb.call(scope, wrap(errors.ENO_INPUT, [indexfile]));
        cb.call(scope, null, file);
      });
    });
  });
}

module.exports = directory;
