var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

function mkdirs(target, file, cb) {
  var dir = path.dirname(file);
  if(dir === '.') return cb();
  dir = path.join(target, dir);
  fs.stat(dir, function(err, stats) {
    if(stats && stats.isFile() || stats && stats.isDirectory()) {
      return cb();
    }
    mkdirp(dir, cb);
  });
}

module.exports = mkdirs;
