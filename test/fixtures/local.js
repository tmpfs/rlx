var mock = require('../util/mock');

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
  // LOCAL DOCUMENT
  {
    id: 'lcl/add',
    description: 'Create a local document',
    api: [params.db, parameters.local, params.docid],
    method: methods.put,
    doc: docs.local + '#put--db-_local-docid',
    before: ['db/add'],
    cmd: [
      'lcl',
      'add',
      '-s',
      server,
      '-d',
      database,
      '-t',
      'doc/new',
      '-i',
      mock.document.id,
      '@bool=' + mock.document.bool,
      '@int=' + mock.document.int,
      '@float=' + mock.document.float,
      '@arr=' + mock.document.arr,
      '@str=' + mock.document.str,
      '@nil=' + mock.document.nil,
    ]
  },
  {
    id: 'lcl/cp',
    description: 'Copy a local document',
    api: [params.db, parameters.local, params.docid],
    method: methods.copy,
    doc: docs.local + '#copy--db-_local-docid',
    cmd: [
      'lcl',
      'cp',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id,
      '--destination',
      mock.copy.id
    ]
  },
  {
    id: 'lcl/get',
    description: 'Get a local document',
    api: [params.db, parameters.local, params.docid],
    method: methods.get,
    doc: docs.local + '#get--db-_local-docid',
    cmd: [
      'lcl',
      'get',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id
    ]
  },
  {
    id: 'lcl/rm',
    description: 'Remove a local document',
    api: [params.db, parameters.local, params.docid],
    method: methods.delete,
    doc: docs.local + '#delete--db-_local-docid',
    after: ['db/rm'],
    cmd: [
      'lcl',
      'rm',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id
    ]
  },
];

module.exports = fixtures;
