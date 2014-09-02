var async = require('async');
var path = require('path');
var fs = require('fs');
var walk = require('recursive-readdir');
var resolve = require('./resolve');

function include(file) {
  var doc;
  if(!/\.(json|js)$/.test(file)) return null;
  //console.log('include %s', file);
  try{
    doc = require(file);
  }catch(e) {
    return e;
  }
  return doc;
}

function filter(file, options, err, stats) {
  var exists = !err && typeof stats === 'object';
  if(!exists && !options.all) return false;
  //console.log('filter %s', file);
  if(exists && stats.isDirectory()) {
    return options.recursive;
  }else{
    return /\.(json|js)$/.test(file);
  }
}

function read(req, options, file, callback) {
  var scope = this;
  file = resolve(file);
  //console.log('read file %s', file);
  var log = this.log, recursive = options.recursive, item = {};
  var filter = options.filter;
  fs.stat(file, function(err, stats) {
    var exists = !err && typeof stats === 'object';
    if(typeof filter === 'function' && !filter(file, options, err, stats)) {
      if(options.warn) {
        log.warn('ignore %s', file);
      }
      return callback(null);
    }

    if(!exists && options.warn) {
      log.warn('file %s (%s)', file, err.code);
    }

    function load(file, stats, callback) {
      if(!exists && !options.all) return callback(null);
      item = {file: file, stats: stats, err: err, exists: exists};
      if(exists && options.require) {
        var res = include(file);
        if(res instanceof Error) {
          item.err = res;
          if(options.warn) {
            log.warn('file %s (%s)', file, (res.message || '').toLowerCase());
          }
        }else{
          //console.dir('asign to item');
          item.doc = res;
        }
      }
      callback(null, item);
    }

    if(stats && stats.isDirectory()) {
      if(recursive) {
        walk(file, function(err, files) {
          if(err) return callback(err);
          async.concatSeries(files, function(item, callback) {
            read.call(scope, req, options, item, callback);
          }, function(err, results) {
            return callback(err, results);
          })
        })
      }else{
        //console.log('read non-recursive directory %s', file);
        fs.readdir(file, function(err, files) {
          if(err) return callback(err);
          async.concatSeries(files, function(item, callback) {
            item = path.join(file, item);
            //console.log('read item %s', item);
            fs.stat(item, function(err, stats) {
              if(err) return callback(err);
              if(stats && stats.isFile()) {
                load(item, stats, callback);
              }else{
                callback();
              }
            })
          }, function(err, results) {
            return callback(err, results);
          })
        })
      }
    }else {
      load(file, stats, callback);
    }
  });
}

function files(req, options, cb) {
  var scope = this;
  var log = this.log, recursive = this.recursive;
  if(typeof options === 'function') {
    next = options;
    options = {};
  }
  options = options || {};
  options.recursive = this.recursive;
  var list = options.list || [];
  options.all = typeof options.all === 'boolean'
    ? options.all : false;
  options.recursive = typeof this.recursive === 'boolean'
    ? this.recursive : false;
  options.warn = typeof options.warn === 'boolean'
    ? options.warn : true;
  options.require = typeof options.require === 'boolean'
    ? options.require : true;
  options.filter = options.filter
    ? options.filter : filter;

  async.concatSeries(list, function(item, callback) {
    read.call(scope, req, options, item, callback);
  }, function(err, results) {
    if(err) return cb(err);
    results = results.map(function(value) {
      return value && typeof value === 'object' ? value : null;
    })
    //console.log('GOT RESULTS');
    //console.dir(results);
    cb(null, results);
  })
}

module.exports = files;
