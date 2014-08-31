var async = require('async');
var util = require('util');
var Collator = require('./collator');

var JavascriptCollator = function(options) {
  Collator.apply(this, arguments);
}

util.inherits(JavascriptCollator, Collator);


JavascriptCollator.prototype.include = function(doc, key, file, cb) {
  var component;
  var rewrites = key === this.keys.rewrites;
  try {
    component = require(file.file);
    if(rewrites && !Array.isArray(component)) {
      throw new Error('rewrite include file must export an array');
    }
  }catch(e) {
    return cb(e);
  }
  if(rewrites) {
    doc[key] = doc[key] || [];
    doc[key] = doc[key].concat(component);
  }else{
    doc[key] = component;
  }
  cb();
}

JavascriptCollator.prototype.collate = function(scope, cb) {
  var doc = this.options.doc || {}, keys = this.keys, file;
  this.files(function(err, files) {
    if(err) return cb.call(scope, err);
    var includes = [];
    file = this.getValidateDocUpdate(files);
    if(file) {
      includes.push(
        {doc: doc, key: keys.validate_doc_update, file: file, scope: this});
    }

    file = this.getRewrites(files);
    if(file) {
      includes.push(
        {doc: doc, key: keys.rewrites, file: file, scope: this});
    }

    async.eachSeries(includes, function(item, callback) {
      var method = item.scope.include;
      method.call(item.scope, item.doc, item.key, item.file, function(err) {
        callback(err);
      })
    }, function(err) {
      if(err) return cb.call(scope, err);
      if(Array.isArray(doc.rewrites) && !doc.rewrites.length) {
        doc.rewrites = undefined;
      }
      cb.call(scope, null, doc);
    });
  });
}

module.exports = JavascriptCollator;
