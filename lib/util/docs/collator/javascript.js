var async = require('async');
var util = require('util');
var Collator = require('./collator');

var JavascriptCollator = function(options) {
  this.language = 'javascript';
  Collator.apply(this, arguments);
}

util.inherits(JavascriptCollator, Collator);

JavascriptCollator.prototype.getId = function(file) {
  if(file.document && file.document._id) return file.document._id;
  if(file.key) {
    if(this.options.strip) {
      return file.key.replace(/\.(js|json)$/, '');
    }
    return file.key;
  }
  return file.name;
}

JavascriptCollator.prototype.include = function(file, cb) {
  var component;
  try {
    component = require(file.file);
  }catch(e) {
    return cb(e);
  }
  file.document = component;
  file.id = this.getId(file);
  //console.dir(this.options.auto);
  if(this.options.auto
    && file.id
    && file.document) {
    file.document._id = file.id;
  }
  cb(null, file);
}

JavascriptCollator.prototype.collate = function(scope, cb) {
  this.files(function(err, files) {
    if(err) return cb.call(scope, err);
    var includes = [];
    for(var k in files) {
      files[k].key = k;
      includes.push({file: files[k], scope: this});
    }
    async.concatSeries(includes, function(item, callback) {
      var method = item.scope.include;
      method.call(
        item.scope, item.file, callback);
    }, function(err, results) {
      if(err) return cb.call(scope, err);
      cb.call(scope, null, results);
    });
  });
}

module.exports = JavascriptCollator;
