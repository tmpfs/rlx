var async = require('async');
var fs = require('fs');
var path = require('path');
var fileobject = require('../file-object');
var match = require('../match');

function list(req, options, cb) {
  if(typeof options === 'function') {
    cb = options;
    options = null;
  }
  options = options || {};
  var scope = this;
  var log = this.log;
  var dirs = options.dirs || req.dirs.design;
  var list = {};
  async.eachSeries(dirs, function(dir, callback) {
    fs.exists(dir, function(exists) {
      if(!exists) {
        log.debug('skipping non-existent design directory %s', dir);
        return callback();
      }
      fs.readdir(dir, function (err, files) {

        if(err) return callback(err);
        var contents = [], file, fo;
        for(var i = 0;i < files.length;i++) {
          file = path.join(dir, files[i]);
          fo = fileobject(file, dir);
          if(options.patterns && !match(fo, options.patterns)) {
            //console.log('continue on mismatch %s', file);
            continue;
          }
          contents.push(fo);
        }
        list[dir] = contents;
        callback(null);
      });
    })
  }, function(err) {
    if(err) cb(err);
    var all = {}, ls, i, j, item;
    for(i = 0;i < dirs.length;i++) {
      ls = list[dirs[i]] || [];
      for(j = 0;j < ls.length;j++) {
        item = ls[j];
        // overriding template
        if(all[item.path]) {
          item.override = all[item.path];
        }
        all[item.path] = item;
      }
    }
    cb.call(scope, null, list, all);
  });
}

module.exports = list;
