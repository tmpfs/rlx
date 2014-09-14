var fs = require('fs')
  , path = require('path');

function debug(code) {
  var conf = this.configure()
    , file = path.join(process.cwd(), conf.debug.file)
  console.dir(file);
}

module.exports = debug;
