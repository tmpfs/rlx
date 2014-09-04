var fs = require('fs');
var resolve = require('../resolve');

function fsref(options, cb) {
  options = options || {};
  var name = resolve(options.name);
  fs.stat(resolve(name), function(err, stats) {
    var doc = {exists: !err, stat: stats, file: name, name: options.name};
    cb(doc);
  });
}

module.exports = fsref;
