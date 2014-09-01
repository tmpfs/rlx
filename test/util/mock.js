var fs = require('fs');
var path = require('path');
var cdb = require('cdb');
var base = path.normalize(path.join(__dirname, '..', '..'));
var target = path.join(base, 'target')
var program = require('../../lib/rlx');
var userdb = require('../../lib/command/user/userdb');

var attachment = {
  name: 'mock-attachment.txt',
  ddoc: 'mock-design-document-attachment.txt'
}

var mock = {
  name: 'rlx-test-runner',
  program: program,
  editor: path.join(base, 'test', 'bin', 'editor'),
  cdb: cdb,
  server: {
    default: process.env.rlx_test_server || 'http://localhost:5984'
  },
  app: {
    ddoc: 'mock-design-document',
    copy: 'mock-design-document-copy'
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
  repl: {
    source: 'mock/database',
    target: 'mock/database/copy'
  },
  user: {
    name: 'mock-user',
    password: 'secret',
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
    id: 'mock/document',
    bool: false,
    int: 1024,
    float: 1.67,
    arr: [1,2,3],
    str: 'value',
    nil: null
  },
  copy: {
    id: 'mock/document/copy'
  },
  attachment: attachment,
  paths: {
    base: base,
    pkg: path.join(base, 'package.json'),
    target: target,
    fixtures: path.join(base, 'test', 'fixtures'),
    security: path.join(base, 'test', 'fixtures', 'security.json'),
    attachment: path.join(
      base, 'test', 'fixtures', 'attachments', attachment.name),
    app: path.join(base, 'test', 'fixtures', 'app'),
  },
  fixtures: {}
}

attachment.path = mock.paths.attachment;
attachment.doc = '' + fs.readFileSync(attachment.path);
mock.app.path = mock.paths.app;

module.exports = mock;
