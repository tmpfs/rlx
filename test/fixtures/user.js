var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');

var cdb = require('cdb');
var parameters = cdb.parameters;
var methods = cdb.methods;

var params = require('./params');
var urls = require('./urls')
  , api = urls.api
  , docs = urls.docs;

var database = mock.database.default
  , server = mock.server.default;

var fixtures = [
  // USER
  {
    id: 'user',
    description: 'List users',
    api: [cdb.user.db, parameters.docs],
    method: methods.get,
    doc: docs.bulk + '#get--db-_all_docs',
    cmd: [
      'user',
      '-s',
      server
    ]
  },
  {
    id: 'user/ls',
    description: 'List users',
    api: [cdb.user.db, parameters.docs],
    method: methods.get,
    doc: docs.bulk + '#get--db-_all_docs',
    cmd: [
      'user',
      'ls',
      '-s',
      server
    ]
  },
  {
    id: 'user/add',
    description: 'Create or update a user',
    api: [cdb.user.db, params.docid],
    method: methods.put,
    doc: docs.document + '#put--db-docid',
    cmd: [
      'user',
      'add',
      '-s',
      server,
      '@name=' + mock.user.name,
      '@password=' + mock.user.password,
      '@roles=user'
    ]
  },
  {
    id: 'user/get',
    description: 'Get a user',
    api: [cdb.user.db, params.docid],
    method: methods.get,
    doc: docs.document + '#get--db-docid',
    cmd: [
      'user',
      'get',
      '-s',
      server,
      '@name=' + mock.user.name,
    ]
  },
  {
    id: 'user/edit',
    description: 'Update a user',
    api: [cdb.user.db, params.docid],
    method: methods.put,
    doc: docs.document + '#put--db-docid',
    before: [setup.edit.mock],
    after: [teardown.edit.restore],
    cmd: [
      'user',
      'edit',
      '-s',
      server,
      '@name=' + mock.user.name
    ]
  },
  {
    id: 'user/passwd',
    description: 'Change user password',
    api: [cdb.user.db, params.docid],
    method: methods.put,
    doc: docs.document + '#put--db-docid',
    cmd: [
      'user',
      'passwd',
      '-s',
      server,
      '@name=' + mock.user.name,
      '@password=' + mock.user.password
    ]
  },
  {
    id: 'user/rm',
    description: 'Remove a user',
    api: [cdb.user.db, params.docid],
    method: methods.delete,
    doc: docs.document + '#delete--db-docid',
    cmd: [
      'user',
      'rm',
      '-s',
      server,
      '@name=' + mock.user.name,
    ]
  },
];

module.exports = fixtures;
