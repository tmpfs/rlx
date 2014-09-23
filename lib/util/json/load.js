var async = require('async')
  , fs = require('fs');

var resolve = require('../resolve');

module.exports = function load(opts, cb) {
  opts = opts || {};
  var list = [], files = opts.files || [], i;
  if(opts.body) list.push(opts.body);

  // don't use require(), we don't want them cached
  async.concatSeries(files, function(file, cb) {
    file = resolve(file);
    fs.readFile(file, function(err, data) {
      if(err) return cb(err);
      data = '' + data;
      var doc;
      try {
        doc = JSON.parse(data);
      }catch(e) {
        return cb(e);
      }
      cb(null, doc)
    })
  }, function(err, results) {
    cb(null, list.concat(results));
  })
}
