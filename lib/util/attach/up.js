var async = require('async');
var fs = require('fs');
var path = require('path');
var fileobject = require('../file-object');

var files = require('../files');

function up(options, info, req, cb) {
  options = options || {};
  var info = {missing:[], files: []};
  var list = options.files || [];
  var attname = options.attname || [];

  var options = {
    list: list,
    require: false,
    all: true,
    recursive: this.recursive,
    filter: function(file, options, err, stats) {
      return !err && stats;
    }
  }

  files.call(this, req, options, function(err, info) {
    //console.dir(arguments);
    //var fo = fileobject();
    if(info.length === 1 && attname) {

    }
    cb(err, null, info);
  })

  //async.eachSeries(files, function(file, callback) {
    //var fo = fileobject(file, path.dirname(file));
    //fs.exists(file, function(exists) {
      //if(!exists) {
        //info.missing.push(fo);
        //return callback();
      //}
      //console.log('check file %j', fo);

      //fs.stat(file, function(err, stats) {
        //if(stats) {
          //fo.stat = stats;
          //if(stats.isFile()) {
            //info.files.push(fo);
          //}else if(stats.isDirectory()) {
            //console.log('add directory to attachment list');
          //}
        //}
        //callback();
      //})
    //})
  //}, function(err) {
    //cb(err, null, info);
  //})
}

module.exports = up;
