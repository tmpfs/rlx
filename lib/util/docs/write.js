var async = require('async');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var stringify = require('../stringify');
var download = require('../attach').dl.download;

function attach(fo, options, req, cb) {
  var scope = this;
  var opts = {output: path.dirname(fo.file)};
  var doc = fo.document;
  async.concatSeries(fo.attachments, function(att, callback) {
    download.call(scope, doc, att.path, opts, req, callback);
  }, function(err, result) {
    cb(err, result);
  })
}

function write(options, info, req, cb) {
  var scope = this, errors = this.errors;
  options = options || {};
  var files = options.files || [];
  async.concatSeries(files, function(fo, callback) {
    var doc = stringify(fo.document, null, scope.indent);
    var p = path.dirname(fo.file);
    // create parent directories
    mkdirp(p, function(err) {
      if(err) return callback(err);
      fs.exists(fo.file, function(exists) {
        if(exists && !options.force) {
          return cb(scope.wrap(errors.EFS_FILE_EXISTS,
            [fo.file, scope.options().force.toString(null)]));
        }
        // write document file
        fs.writeFile(fo.file, doc, function(err) {
          if(err) return callback(err);
          // download attachments
          if(fo.attachments) {
            return attach.call(scope, fo, options, req, callback);
          }
          callback(err, fo);
        });
      });
    });
  }, function(err, result) {
    cb(err, {files: files, result: result});
  })
}

module.exports = write;
