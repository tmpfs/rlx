var path = require('path');
var archy = require('archy');
var types = require('../types');
var extensions = [types.JS];

function hasExtension(name) {
  var i, nm, full;
  for(i = 0;i < extensions.length;i++) {
    full = path.basename(name);
    nm = path.basename(name, '.' + extensions[i]);
    if(nm !== full) {
      return true;
    }
  }
  return false;
}

function find(name, list) {
  var results = [], i, resolved;
  var ext = hasExtension(name);
  if(ext) {
    return list[name];
  }else{
    for(i = 0;i < extensions.length;i++) {
      resolved = name + '.' + extensions[i];
      if(list[resolved]) {
        results.push(list[resolved]);
      }
    }
    if(results.length === 1) return results[0];
    // ambiguous reference, returns array of templates
    return results;
  }
}

function treeify(list, convert) {
  var keys = Object.keys(list), key, i;
  var delimiter = '/';
  var tree = {
    label: "templates",
    nodes: []
  };

  function inject(parts, key, item) {
    var j, id, parent = tree.nodes, exists, inject;
    while(id = parts.shift()) {
      if(item.override && !parts.length) id += ' (override)';
      if(!parts.length) {
        parent.push(id);
      }else{
        exists = false;
        for(var i = 0;i < parent.length;i++) {
          if(typeof parent[i] === 'string') continue;
          if(parent[i] && parent[i].label === id) {
            exists = true;
            parent = parent[i].nodes = parent[i].nodes || [];
          }
        }
        if(!exists) {
          inject = {label: id};
          parent.push(inject);
          if(parts.length) {
            inject.nodes = [];
            parent = inject.nodes;
          }
        }
      }
    }
  }

  for(i = 0;i < keys.length;i++) {
    key = keys[i];
    inject(key.split(delimiter), key, list[key]);
  }
  return convert ? archy(tree) : tree;
}


module.exports = {
  list: require('./list'),
  parse: require('./parse'),
  extensions: extensions,
  treeify: treeify,
  find: find
}
