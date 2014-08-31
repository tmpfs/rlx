var path = require('path');
var walk = require('recursive-readdir');
var fileobject = require('../../file-object');
var index = 'index.json';
var keys = {
  rewrites: 'rewrites',
  views: 'views',
  lib: 'lib',
  updates: 'updates',
  shows: 'shows',
  lists: 'lists',
  validate_doc_update: 'validate_doc_update',
  map: 'map',
  reduce: 'reduce'
}
var rules = {
  attachments: /^attachments\//,
  lib: /^lib\//,
  views: /^views\//,
  updates: /^updates\//,
  shows: /^shows\//,
  lists: /^lists\//,
  viewslib: /^views\/lib\//,
  viewsfile: /^views\/[^\.\/]+\./,
  rewrites: /^rewrites\./,
  map: /^map\./,
  reduce: /^reduce\./,
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

/**
 *  Find a file entry that matches a pattern.
 *
 *  @param files The files list.
 *  @param re The match pattern.
 *  @param field The field to test against, default is *path*.
 */
Collator.prototype.find = function(files, re, field) {
  field = field || 'path';
  for(var i = 0;i < files.length;i++) {
    if(re.test(files[i][field])) {
      return files[i];
    }
  }
  return null;
}

/**
 *  Collect all files that match a pattern.
 *
 *  @param files The files list.
 *  @param re The match pattern.
 *  @param id A boolean indicating that an id should be assigned.
 *  @param field The field to test against, default is *path*.
 */
Collator.prototype.collect = function(files, re, id, field) {
  var results = [], i, file, name;
  field = field || 'path';
  for(var i = 0;i < files.length;i++) {
    file = files[i];
    if(re.test(file[field])) {
      if(id) {
        name = file.name;
        if(~name.indexOf('.')) {
          name = name.substr(0, name.lastIndexOf('.'))
        }
        file.id = name;
      }
      results.push(file);
    }
  }
  return results;
}

Collator.prototype.getViewKey = function(file) {
  var nm = path.basename(file.path);
  if(rules.map.test(nm)) {
    return keys.map;
  }else if(rules.reduce.test(nm)){
    return keys.reduce;
  }
  return null;
}

Collator.prototype.getLibrary = function(files) {
  return this.collect(files, rules.lib, true);
}

Collator.prototype.getViewLibrary = function(files) {
  return this.collect(files, rules.viewslib, true);
}

Collator.prototype.getUpdates = function(files) {
  return this.collect(files, rules.updates, true);
}

Collator.prototype.getShows = function(files) {
  return this.collect(files, rules.shows, true);
}

Collator.prototype.getLists = function(files) {
  return this.collect(files, rules.lists, true);
}

Collator.prototype.getViews = function(files) {
  var o = {};
  var views = this.collect(files, rules.views);
  var i, l = views.length, file, name, key;
  for(i = 0;i < l;i++) {
    file = views[i];
    name = file.name;
    if(rules.viewslib.test(file.path)) {
      continue;
    }else{
      if(!rules.viewsfile.test(file.path)) {
        key = this.getViewKey(file);
        name = path.basename(path.dirname(file.path));
        if(key) {
          o[name] = o[name] || {id: key};
          o[name][key] = file;
        }
      }else{
        if(~name.indexOf('.')) {
          name = name.substr(0, name.lastIndexOf('.'))
        }
        file.object = true;
        file.id = name;
        o[name] = file;
      }
    }
  }
  return o;
}

Collator.prototype.getAttachments = function(files) {
  return this.collect(files, rules.attachments);
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
