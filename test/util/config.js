var fs = require('fs');
var path = require('path');
var base = path.normalize(path.join(__dirname, '..', '..'));
var target = path.join(base, 'target')
var program = require('../../lib/rlx');

var config = {
  name: 'rlx-test-runner',
  program: program,
  server: {
    default: 'http://localhost:5984'
  },
  database: {
    default: 'mock-database'
  },
  paths: {
    base: base,
    pkg: path.join(base, 'package.json'),
    target: target
  }
}

config.file = function(name) {
  return path.join(target, name);
}

config.json = function(file) {
  return require(file);
}

config.text = function(file) {
  return '' + fs.readFileSync(file);
}

module.exports = config;
