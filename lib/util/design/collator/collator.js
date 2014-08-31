var walk = require('recursive-readdir');
var fileobject = require('../../file-object');
var index = 'index.json';
var keys = {
  rewrites: 'rewrites',
  validate_doc_update: 'validate_doc_update'
}
var rules = {
  rewrites: /^rewrites\./,
  validate_doc_update: /^validate_doc_update\./
}

var Collator = function(options) {
  this.options = options;
  this.keys = keys;
}

Collator.prototype.remove = function(files, name, path) {
  return files.filter(function(value) {
    if(value.name !== name && value.path !== path) {
      return value;
    }
  });
}

Collator.prototype.find = function(files, re, field) {
  field = field || 'path';
  for(var i = 0;i < files.length;i++) {
    if(re.test(files[i][field])) {
      return files[i];
    }
  }
  return null;
}

Collator.prototype.getRewrites = function(files) {
  return this.find(files, rules.rewrites);
}

Collator.prototype.getValidateDocUpdate = function(files) {
  return this.find(files, rules.validate_doc_update);
}

Collator.prototype.include = function(doc, key, file) {}

Collator.prototype.files = function(cb) {
  var scope = this, dir = this.options.tpl.file;
  walk(dir, function(err, files) {
    files.forEach(function(value, index, arr) {
      arr[index] = fileobject(value, dir);
    });
    files = scope.remove(files, index, index);
    cb.call(scope, err, files);
  })
}

module.exports = Collator;
