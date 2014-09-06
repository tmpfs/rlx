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
  var files = this.options.documents, includes = this.includes;
  if(this.options.flat) {
    files = {};
    this.options.files.forEach(function(fo) {
      if(match(fo, includes)) {
        delete fo.attachments;
        files[fo.path] = fo;
      }
    });
  }

  if(this.options.patterns) {
    for(var k in files) {
      fo = files[k];
      if(!match(fo, this.options.patterns)) {
        delete files[k];
      }
    }
  }
  this.options.originals = this.options.documents;
  this.options.documents = files;
  cb.call(this, null, files);
}

module.exports = Collator;
