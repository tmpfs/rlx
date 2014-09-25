var property = require('cli-property')
  , regexp = require('cli-regexp')
  , match = require('../match');

module.exports = function grep(opts, cb) {
  opts = opts || {};
  var list = opts.list = opts.list || [];
  var patterns = opts.patterns = opts.patterns || [];
  var glob = opts.glob = opts.glob || [];
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

  function doWithSource(func) {
    for(i = 0;i < list.length;i++) {
      source = list[i];
      func(source);
    }
  }

  function doPatternMatch(source) {
    // exec pattern on source object
    for(j = 0;j < patterns.length;j++) {
      re = patterns[j];
      res = property.exec(re, source, exec);
      results = results.concat(res);
    }
  }

  function doGlobMatch(source) {
    var flat = property.flatten(source, {delimiter: '/'});
    var k, v;
    for(k in flat) {
      v = flat[k];
      if(match(k, glob)) {
        // prevent pattern and glob matches duplicating (flat)
        k = k.split('/').join('.');
        // parent unavailable for glob matches
        results.push({key: k, value: v});
      }
    }
  }

  doWithSource(doPatternMatch);

  if(glob.length) {
    doWithSource(doGlobMatch);
  }
  cb(null, results);
}
