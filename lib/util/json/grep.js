var property = require('cli-property')
  , regexp = require('cli-regexp');

module.exports = function grep(opts, cb) {
  opts = opts || {};
  var list = opts.list = opts.list || [];
  var patterns = opts.patterns = opts.patterns || [];
  var exec = opts.exec = opts.exec || {};
  var results = [], i, source, j, re, res;

  // convert patterns to regexp, fail early
  for(j = 0;j < patterns.length;j++) {
    try{
      patterns[j] = regexp.parse(patterns[j]);
    }catch(e){
      return cb(e);
    }
  }
  for(i = 0;i < list.length;i++) {
    source = list[i];
    // exec pattern on source object
    for(j = 0;j < patterns.length;j++) {
      re = patterns[j];
      res = property.exec(re, source, exec);
      results = results.concat(res);
    }
  }
  cb(null, results);
}
