var mm = require('minimatch');

function match(file, patterns) {
  var f = typeof(file) === 'object' ? file.path : file;
  for(var i = 0;i < patterns.length;i++) {
    //console.log('%s test: %s (%j)',
      //patterns[i], f, mm(f, patterns[i]));
    if(mm(f, patterns[i])) {
      return true;
    }
  }
  return false;
}

module.exports = match;
