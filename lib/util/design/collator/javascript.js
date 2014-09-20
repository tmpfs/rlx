var async = require('async');
var util = require('util');
var Collator = require('./collator');

var JavascriptCollator = function(options) {
  this.language = 'javascript';
  Collator.apply(this, arguments);
}

util.inherits(JavascriptCollator, Collator);


JavascriptCollator.prototype.include = function(doc, key, file, cb) {
  var component;
  var rewrites = key === this.keys.rewrites;
  var views = key === this.keys.views;
  var lib = !key || key === this.keys.lib;
  var exports = 'module.exports = ';
  if(!key) {
    key = file.id;
    file.id = null;
  }
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
    if(file.id) {
      doc[key] = doc[key] || {};
      if(lib) {
        doc[key][file.id] = exports + component.toString();
      }else{
        doc[key][file.id] = component;
      }
    }else{
      if(lib) {
        doc[key] = exports + component.toString();
      }else{
        doc[key] = component;
      }
    }
  }else if(views) {
    doc[key] = doc[key] || {};
    doc[key][file.id] = component;
  }
  cb();
}

JavascriptCollator.prototype.collate = function(scope, cb) {
  var doc = this.options.doc || {}, keys = this.keys, file;
  this.files(function(err, files) {
    if(err) return cb.call(scope, err);
    var includes = [], list, file;
    var attachments = this.getAttachments(files);
    var docs = this.getDocs(files);

    /**
     *  Add an array of elements to the includes list.
     */
    function append(files, key, parent) {
      var document = parent || doc;
      for(var i = 0;i < files.length;i++) {
        includes.push(
          {doc: document, key: key, file: files[i], scope: this});
      }
    }

    // validate doc update
    file = this.getValidateDocUpdate(files);
    if(file) {
      includes.push(
        {doc: doc, key: keys.validate_doc_update, file: file, scope: this});
    }

    // view documents
    list = this.getViews(files);
    for(var k in list) {
      includes.push(
        {doc: doc, key: keys.views, file: list[k], scope: this});
    }

    // lib
    list = this.getLibrary(files);
    append.call(this, list, keys.lib);

    // view lib
    list = this.getViewLibrary(files);
    if(list.length) {
      doc[keys.views] = doc[keys.views] || {};
      append.call(this, list, keys.lib, doc[keys.views]);
    }

    // updates
    list = this.getUpdates(files);
    append.call(this, list, keys.updates);

    // shows
    list = this.getShows(files);
    append.call(this, list, keys.shows);

    // lists
    list = this.getLists(files);
    append.call(this, list, keys.lists);

    // filters
    list = this.getFilters(files);
    append.call(this, list, keys.filters);

    // rewrites
    file = this.getRewrites(files);
    if(file) {
      includes.push(
        {doc: doc, key: keys.rewrites, file: file, scope: this});
    }

    // top-level commonjs modules
    if(files.length) {
      list = this.getModules(files);
      append.call(this, list, null);
    }

    async.eachSeries(includes, function(item, callback) {
      var method = item.scope.include;
      method.call(
        item.scope, item.doc, item.key, item.file, callback);
    }, function(err) {
      if(err) return cb.call(scope, err);
      if(Array.isArray(doc.rewrites) && !doc.rewrites.length) {
        delete doc.rewrites;
      }
      cb.call(scope, null, {design: doc, attachments: attachments, docs: docs});
    });
  });
}

module.exports = JavascriptCollator;
