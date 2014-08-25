var fs = require('fs');
var path = require('path');
var config = require('./mock');

var editor, visual;
config.edit = {};
config.edit.mock = function(cb) {
  editor = process.env.EDITOR;
  visual = process.env.VISUAL;
  process.env.VISUAL = process.env.EDITOR = config.editor;
  cb();
}

config.edit.restore = function(cb) {
  process.env.VISUAL = visual;
  process.env.EDITOR = editor;
  cb();
}

config.file = function(name, content) {
  var file = path.join(config.paths.target, name);
  if(content) fs.writeFileSync(file, content);
  return file;
}

config.rmfile = function(file) {
  fs.unlinkSync(file);
}

config.json = function(file) {
  var contents = config.text(file);
  //console.log('contents: %s', contents);
  return JSON.parse(contents);
}

config.text = function(file) {
  return '' + fs.readFileSync(file);
}

config.require = function(file) {
  return require(file);
}

// helpers to perform common requests
config.db = require('./db')(config);

// assertion helpers
var assert = require('../assert');
config.assert = require('../assert');
config.error = assert.error;

/**
 *  Load test fixtures.
 */
function fixtures() {
  var files = fs.readdirSync(config.paths.fixtures), file, key, pth, item;
  for(var i = 0;i < files.length;i++) {
    file = files[i];
    key = path.basename(file, '.json');
    pth = path.join(config.paths.fixtures, file);
    config.paths[key] = pth;
    contents = '' + fs.readFileSync(pth);
    item = {
      name: file,
      path: pth,
      doc: contents,
      data: /\.json$/.test(file) ? JSON.parse(contents) : contents
    }
    config.fixtures[key] = item;
  }
}

fixtures();

config.attachment = config.fixtures['mock-attachment.txt'];

module.exports = config;
