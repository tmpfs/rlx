var path = require('path');
var walk = require('recursive-readdir');
var fileobject = require('../../file-object');
var config = require('./config')
  , index = config.index
  , keys = config.keys
  , rules = config.rules;

var match = require('../../match');
var collect = require('../../docs/collect');

var Collator = function(options) {
  this.options = options || {};
  this.keys = keys;
  this.consume = options.consume !== undefined
    ? options.consume : true;

  this.ignores = options.ignores || ['**/.*'];
  this.index = options.index || {};
  this.index.docs = ['index.json', 'index.js'];
  this.system = ['index.json'];
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
  var i, file;
  field = field || 'path';
  for(i = 0;i < files.length;i++) {
    if(re.test(files[i][field])) {
      file = files[i];
      if(this.consume) files.splice(i, 1);
      return file;
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
  var results = [], i, file, name, l = files.length;
  field = field || 'path';
  for(i = 0;i < l;i++) {
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
      if(this.consume) {
        files.splice(i, 1);
        i--;l--;
      }
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

Collator.prototype.getFilters = function(files) {
  return this.collect(files, rules.filters, true);
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
          o[name] = o[name] || {id: name};
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

Collator.prototype.getModules = function(files) {
  return this.collect(files, rules.modules, true);
}

Collator.prototype.getAttachments = function(files) {
  var list = this.collect(files, rules.attachments);
  for(var i = 0;i < list.length;i++) {
    list[i].path = list[i].path.replace(rules.attachments, '');
  }
  return list;
}

Collator.prototype.getDocs = function(files) {
  var list = this.collect(files, rules.docs);
  return collect(
    list, {indices: this.index.docs, rule: rules.docs, strip: true});
}

Collator.prototype.getRewrites = function(files) {
  return this.find(files, rules.rewrites);
}

Collator.prototype.getValidateDocUpdate = function(files) {
  return this.find(files, rules.validate_doc_update);
}

Collator.prototype.include = function(doc, key, file) {}

Collator.prototype.files = function(cb) {
  var scope = this, dir = this.options.tpl.file, fo;
  walk(dir, function(err, files) {
    var list = [], sys = [], ignored = [];
    var i, value;
    for(i = 0;i < files.length;i++) {
      value = files[i];
      fo = fileobject(value, dir);
      if(match(fo, scope.system)) {
        sys.push(fo);
        continue;
      }
      if(match(fo, scope.ignores)) {
        ignored.push(fo);
        continue;
      }
      list.push(fo);
    }
    //files = scope.remove(files, index, index);
    cb.call(scope, err, list, sys, ignored);
  })
}

module.exports = Collator;
