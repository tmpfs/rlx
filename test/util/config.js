var fs = require('fs');
var path = require('path');
var cdb = require('cdb');
var base = path.normalize(path.join(__dirname, '..', '..'));
var target = path.join(base, 'target')
var program = require('../../lib/rlx');
var userdb = require('../../lib/command/user/userdb');

var config = {
  name: 'rlx-test-runner',
  program: program,
  editor: path.join(base, 'test', 'bin', 'editor'),
  cdb: cdb,
  server: {
    default: process.env.rlx_test_server || 'http://localhost:5984'
  },
  conf: {
    section: 'mock-config-section',
    key: 'mock-config-key',
    value: 'mock-config-value'
  },
  database: {
    default: 'mock/database',
    users: userdb.default,
    unknown: 'mock-unknown-database'
  },
  user: {
    name: 'mock-user',
    pass: 'secret',
    id: userdb.prefix + 'mock-user',
    roles: 'admin,user',
    type: 'user'
  },
  admin: {
    name: 'mock-admin',
    pass: 'secret',
    alt: {
      name: 'mock-alt-admin',
      pass: 'secret'
    }
  },
  design: {
    auth: '_auth'
  },
  document: {
    id: 'mock-document',
    bool: false,
    int: 1024,
    float: 1.67,
    arr: [1,2,3],
    str: 'value',
    nil: null
  },
  paths: {
    base: base,
    pkg: path.join(base, 'package.json'),
    target: target,
    fixtures: path.join(base, 'test', 'fixtures'),
  },
  fixtures: {}
}

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
  var file = path.join(target, name);
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
//config.assert = require('./assert');
config.assert = require('../assert');
config.error = require('./error');

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

module.exports = config;
