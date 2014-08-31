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
  var views = key === this.keys.views;
  try {
    if(!views) {
      component = require(file.file);
    }else{
      if(file.object) {
        component = {
          map: require(file.file).map,
          reduce: require(file.file).reduce
        }
      }else{
        component = {
          map: require(file.map.file),
          reduce: require(file.reduce.file)
        }
      }
    }
    if(rewrites && !Array.isArray(component)) {
      throw new Error('rewrite include file must export an array');
    }
  }catch(e) {
    return cb(e);
  }
  if(rewrites) {
    doc[key] = doc[key] || [];
    doc[key] = doc[key].concat(component);
  }else if(!views){
    doc[key] = component;
  }else if(views) {
    //console.log('append to views %j', file.id)
    doc[key] = doc[key] || {};
    doc[key][file.id] = component;
  }
  cb();
}

JavascriptCollator.prototype.collate = function(scope, cb) {
  var doc = this.options.doc || {}, keys = this.keys, file;
  this.files(function(err, files) {
    if(err) return cb.call(scope, err);
    var includes = [], attachments = this.getAttachments(files);
    var viewres = this.getViews(files);

    //console.dir(viewres);

    // validate doc update
    file = this.getValidateDocUpdate(files);
    if(file) {
      includes.push(
        {doc: doc, key: keys.validate_doc_update, file: file, scope: this});
    }

    // rewrites
    file = this.getRewrites(files);
    if(file) {
      includes.push(
        {doc: doc, key: keys.rewrites, file: file, scope: this});
    }

    if(viewres && viewres.views) {
      for(var k in viewres.views) {
        file = viewres.views[k];
        //console.log('adding view %s', file.id);
        //console.dir(file);
        includes.push(
          {doc: doc, key: keys.views, append: true, file: file, scope: this});
      }
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
      cb.call(scope, null, {design: doc, attachments: attachments});
    });
  });
}

module.exports = JavascriptCollator;
