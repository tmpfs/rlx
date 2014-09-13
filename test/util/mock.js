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

var pkg = path.join(base, 'package.json')
  , test = path.join(base, 'test')
  , fixtures = path.join(test, 'fixtures')
  , batch = path.join(fixtures, 'batch')
  , security = path.join(fixtures, 'security.json')
  , attachments = path.join(fixtures, 'attachments')
  , attachfile = path.join(attachments, attachment.name)
  , app = path.join(fixtures, 'app')
  , docs = path.join(app, 'docs')
  , updates = path.join(fixtures, 'updates')
  , docspull = path.join(target, 'docs', 'pull')
  , templates = path.join(fixtures, 'template')
  , tplerrors = path.join(templates, 'error')
  , tpl = path.join(templates, 'mock-template.js');

var mock = {
  name: 'rlx-test-runner',
  program: program,
  editor: path.join(base, 'test', 'bin', 'editor'),
  cdb: cdb,
  server: {
    default: process.env.rlx_test_server || 'http://localhost:5984',
    secure: process.env.rlx_test_server_secure || 'https://localhost:5984'
  },
  app: {
    ddoc: 'mock-design-document',
    copy: 'mock-design-document-copy',
    views: {
      all: 'all',
      inline: 'inline'
    },
    updates: {
      func: 'push',
      docid: 'foo'      // assumes bulk document setup has occured
    },
    shows: {
      func: 'json',
      docid: 'foo'
    },
    lists: {
      func: 'json'
    },
    rewrites: {
      rule: '/foo',
      docid: 'bar'
    },
    tpl: {
      minimal: {name: 'minimal', ddoc: 'minimal-ddoc'},
      validate: {name: 'validate', ddoc: 'validate-ddoc'},
      view: {name: 'view', ddoc: 'view-ddoc'},
      full: {name: 'full', ddoc: 'full-ddoc'},
    }
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
    pkg: pkg,
    target: target,
    test: test,
    fixtures: fixtures,
    batch: batch,
    security: security,
    attachments: attachments,
    attachment: attachfile,
    app: app,
    docs: docs,
    updates: updates,
    templates: templates,
    docspull: docspull,
    tpl: tpl
  },
  fixtures: {},
  usr: {},
  template: {
    name: 'user/new',
    file: 'user/new.js',
    design: 'design/minimal',
    fs: {},
    error: {
      etplexport: path.join(tplerrors, 'etemplate-export.js'),
      etplreturn: path.join(tplerrors, 'etemplate-return.js'),
    }
  },
  rc: {
    key: 'progress.upload',
    value: true
  },
  bulk: {
    ids: [
      'mock-docs-document',
      'mock-docs-id-document-explicit',
      'mock-docs-attachment',
      'mock-docs-alt-attachment'
    ],
    collation: {
      default: {
        attachments: {
          'mock-docs-attachment': [
            'deep/mock-docs-deep-attachment.txt',
            'mock-multiple-attachment.txt',
            'mock-docs-attachment.txt',
          ],
          'mock-docs-alt-attachment': [
            'mock-docs-alt-attachment.txt',
          ]
        }
      }
    },
    unknown: 'unknown-document'
  }
}

mock.usr.home = path.join(target, 'usr');
mock.usr.rlx = path.join(mock.usr.home, '.' + mock.name);

attachment.path = mock.paths.attachment;
attachment.doc = '' + fs.readFileSync(attachment.path);
attachment.dir = path.join(mock.paths.app, 'attachments');
mock.app.path = mock.paths.app;
mock.app.updates.file = path.join(mock.paths.updates, 'mock-list-item.json');
mock.ptn = {wildcard: '**/**'};

mock.template.fs.file = path.join(
  mock.usr.rlx, 'template', 'user', 'new.js');
mock.template.fs.design = path.join(
  mock.usr.rlx, 'template', 'design', 'minimal');

module.exports = mock;
