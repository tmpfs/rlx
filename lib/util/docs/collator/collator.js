var match = require('../../match');

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

Collator.prototype.files = function(cb) {
  var files = this.options.documents;
  if(this.options.flat) {
    files = {};
    this.options.files.forEach(function(fo) {
      if(/\.(json|js)$/.test(fo.name)) {
        delete fo.attachments;
        files[fo.path] = fo;
      }
    });
  }
  if(this.options.patterns) {
    //console.log('match on patterns %j', this.options.patterns);
    for(var k in files) {
      if(!match(k, this.options.patterns)) {
        delete files[k];
      }
    }
  }
  cb.call(this, null, files);
}

module.exports = Collator;
