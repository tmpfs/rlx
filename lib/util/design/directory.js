var fs = require('fs');
var path = require('path');
var resolve = require('../resolve');
var fileobject = require('../file-object');
var index = require('./collator/config').index;
var direxists = require('../direxists');

function directory(dir, req, cb) {
  var scope = this, errors = this.errors, wrap = this.wrap;
  dir = resolve(dir);
  var file = fileobject(dir, path.dirname(dir));
  //console.dir(file);
  fs.exists(file.file, function(exists) {
    if(!exists) return cb.call(scope, wrap(errors.ENO_INPUT, [file.file]));
    direxists.call(scope, file.file, function(err, dir, stat){
      if(err) cb.call(scope, err);
      var indexfile = path.join(dir, index);
      fs.exists(indexfile, function(exists) {
        if(!exists) return cb.call(scope, wrap(errors.ENO_INPUT, [indexfile]));
        cb.call(scope, null, file);
      });
    });
  });
}

module.exports = directory;
