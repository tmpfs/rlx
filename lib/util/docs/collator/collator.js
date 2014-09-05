var util = require('util');
var walk = require('recursive-readdir');
var fileobject = require('../../file-object');
var match = require('../../match');

var DesignCollator = require('../../design/collator/collator');

var Collator = function(options) {
  options = options || {};
  options.documents = options.documents || {};

  // strip file extensions from ids
  options.strip = options.strip === undefined ? true : options.strip;

  // inject automatic identifier
  options.auto = options.auto === undefined ? true : options.auto;

  this.ignores = options.ignores;
  this.system = null;
  this.options = options;
  this.includes = ['**/*.json', '**/*.js'];
}

util.inherits(Collator, DesignCollator);

Collator.prototype.files = function(cb) {
  if(!this.options.dir) {
    return cb.call(this, null, this.options.documents);
  }else{
    var scope = this, dir = this.options.dir, fo;
    walk(dir, function(err, files) {
      var list = [], sys = [], ignored = [];
      var i, value;
      for(i = 0;i < files.length;i++) {
        value = files[i];
        fo = fileobject(value, dir);
        if(scope.system && match(fo, scope.system)) {
          sys.push(fo);
          continue;
        }
        if(scope.ignores && match(fo, scope.ignores)) {
          ignored.push(fo);
          continue;
        }
        if(match(fo, scope.includes)) {
          list.push(fo);
        }
      }
      cb.call(scope, err, list, sys, ignored);
    })
  }
}

module.exports = Collator;
