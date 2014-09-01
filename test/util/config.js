var fs = require('fs');
var path = require('path');
var mock = require('./mock');
var fsutil = require('./fsutil');

// mock data
var config = mock;

// file helpers
for(var k in fsutil) {
  config[k] = fsutil[k];
}

// assertion helpers
var assert = require('../assert');
config.assert = require('../assert');
config.error = assert.error;

/**
 *  Load test fixtures.
 */
function fixtures() {
  var files = fs.readdirSync(config.paths.fixtures)
    , file, key, pth, item, contents;
  for(var i = 0;i < files.length;i++) {
    file = files[i];
    contents = null;
    key = path.basename(file, '.json');
    pth = path.join(config.paths.fixtures, file);
    config.paths[key] = pth;
    var stats = fs.statSync(pth);
    if(stats.isFile()) {
      contents = '' + fs.readFileSync(pth);
    }
    item = {
      name: file,
      path: pth,
      doc: contents,
      data: contents && /\.json$/.test(file) ? JSON.parse(contents) : contents
    }
    config.fixtures[key] = item;
  }
}

fixtures();

module.exports = config;
