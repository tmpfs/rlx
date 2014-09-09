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
  // DOCUMENT
  {
    id: 'doc/add',
    description: 'Create a document',
    api: [params.db, params.docid],
    method: methods.put,
    doc: docs.document + '#put--db-docid',
    before: ['db/add'],
    cmd: [
      'doc',
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
    id: 'doc/cp',
    description: 'Copy a document',
    api: [params.db, params.docid],
    method: methods.copy,
    doc: docs.document + '#copy--db-docid',
    cmd: [
      'doc',
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
    id: 'doc/get',
    description: 'Get a document',
    api: [params.db, params.docid],
    method: methods.get,
    doc: docs.document + '#get--db-docid',
    cmd: [
      'doc',
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
    id: 'doc/conflicts',
    description: 'Get a document with conflicts',
    api: [params.db, params.docid],
    method: methods.get,
    query: 'conflicts=true',
    doc: docs.document + '#get--db-docid',
    cmd: [
      'doc',
      'conflicts',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id
    ]
  },
  {
    id: 'doc/dc',
    description: 'Get a document with deleted conflicts',
    api: [params.db, params.docid],
    method: methods.get,
    query: 'deleted_conflicts=true',
    doc: docs.document + '#get--db-docid',
    cmd: [
      'doc',
      'dc',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id
    ]
  },
  {
    id: 'doc/revs',
    description: 'Get a document with revisions',
    api: [params.db, params.docid],
    method: methods.get,
    query: 'revs=true',
    doc: docs.document + '#get--db-docid',
    cmd: [
      'doc',
      'revs',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id
    ]
  },
  {
    id: 'doc/revsinfo',
    description: 'Get a document with revision information',
    api: [params.db, params.docid],
    method: methods.get,
    query: 'revsinfo=true',
    doc: docs.document + '#get--db-docid',
    cmd: [
      'doc',
      'revsinfo',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id
    ]
  },
  {
    id: 'doc/meta',
    description: 'Get a document with meta information',
    api: [params.db, params.docid],
    method: methods.get,
    query: 'meta=true',
    doc: docs.document + '#get--db-docid',
    cmd: [
      'doc',
      'meta',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id
    ]
  },
  {
    id: 'doc/ls',
    description: 'List documents',
    api: [params.db, parameters.docs],
    method: methods.get,
    doc: docs.bulk + '#get--db-_all_docs',
    cmd: [
      'doc',
      'ls',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'doc/head',
    description: 'Get document revision',
    api: [params.db, params.docid],
    method: methods.head,
    doc: docs.document + '#head--db-docid',
    cmd: [
      'doc',
      'head',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id
    ]
  },
  {
    id: 'doc/rev',
    description: 'Get document revision',
    api: [params.db, params.docid],
    method: methods.head,
    doc: docs.document + '#head--db-docid',
    cmd: [
      'doc',
      'rev',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.document.id
    ]
  },
  {
    id: 'doc/rm',
    description: 'Remove a document',
    api: [params.db, params.docid],
    method: methods.delete,
    doc: docs.document + '#delete--db-docid',
    after: ['db/rm'],
    cmd: [
      'doc',
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
