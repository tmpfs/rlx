var async = require('async');
var parser = require('./parse');
var resolve = require('../resolve');

/**
 *  Load a series of batch files.
 */
function load(opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  var files = opts.files || [];
  async.concatSeries(files, function(file, cb) {
    file = resolve(file);
    opts.file = file;
    parser(opts, function(err, res) {
      cb(err, res);
    })
  }, function(err, result) {
    cb(err, result);
  })
}

module.exports = load;

