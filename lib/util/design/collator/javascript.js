var async = require('async');
var util = require('util');
var Collator = require('./collator');

var JavascriptCollator = function(options) {
  Collator.apply(this, arguments);
}

util.inherits(JavascriptCollator, Collator);


JavascriptCollator.prototype.include = function(doc, key, file, cb) {
  var component;
  try {
    component = require(file.file);
  }catch(e) {
    return cb(e);
  }
  doc[key] = component;
  //console.log('%s', component.toString());
  cb();
}

JavascriptCollator.prototype.collate = function(scope, cb) {
  var doc = this.options.doc || {};
  this.files(function(err, files) {
    if(err) return cb.call(scope, err);

    //console.dir(files);

    var docupdate = this.getValidateDocUpdate(files);
    var includes = [];
    if(docupdate) {
      includes.push(
        {doc: doc, key: 'validate_doc_update', file: docupdate, scope: this});
    }

    async.eachSeries(includes, function(item, callback) {
      var method = item.scope.include;
      method.call(item.scope, item.doc, item.key, item.file, function(err) {
        callback(err);
      })
    }, function(err) {
      if(err) return cb.call(scope, err);
      cb.call(scope, null, doc);
    });
  });
}

module.exports = JavascriptCollator;
