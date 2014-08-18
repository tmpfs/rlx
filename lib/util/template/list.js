var walk = require('recursive-readdir');
var async = require('async');
var fs = require('fs');
var path = require('path');

function list(req, cb) {
  var scope = this;
  var log = this.log;
  var user = req.rc.template || req.dirs.user.template;
  var dirs = [req.dirs.tpl.system, user];
  var list = {};
  async.eachSeries(dirs, function(dir, callback) {
    fs.exists(dir, function(exists) {
      if(!exists) {
        log.warn('skipping non-existent template directory %s', dir);
        return callback();
      }
      walk(dir, function (err, files) {
        if(err) return callback(err);
        var contents = [], file, name, rel;
        for(var i = 0;i < files.length;i++) {
          file = files[i];
          name = path.basename(file);
          rel = file.replace(dir, '').replace(/^\//, '');
          contents.push({file: file, name: name, path: rel});
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
