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

var  fixtures = [
  // DATABASE
  {
    id: 'db/add',
    description: 'Create a database',
    api: [params.db],
    method: methods.put,
    doc: docs.database + '#put--db',
    cmd: [
      'db',
      'add',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'db/bulk',
    description: 'Bulk insert/update',
    api: [params.db, parameters.bulk],
    method: methods.post,
    doc: docs.bulk + '#post--db-_bulk_docs',
    cmd: [
      'db',
      'bulk',
      '-s',
      server,
      '-d',
      database,
      '@docs=foo,bar'
    ]
  },
  {
    id: 'db/ls',
    description: 'List databases',
    api: [parameters.dbs],
    method: methods.get,
    doc: docs.server + '#all-dbs',
    cmd: [
      'db',
      'ls',
      '-s',
      server
    ]
  },
  {
    id: 'db/temp',
    description: 'Execute a temporary view',
    api: [params.db, parameters.temp],
    method: methods.post,
    doc: docs.temp + '#post--db-_temp_view',
    cmd: [
      'db',
      'temp',
      '-s',
      server,
      '-d',
      database
    ]
  },

  {
    id: 'db/purge',
    description: 'Purge documents',
    api: [params.db, parameters.purge],
    method: methods.post,
    doc: docs.misc + '#post--db-_purge',
    cmd: [
      'db',
      'purge',
      '-s',
      server,
      '-d',
      database,
      '@foo=1-0'
    ]
  },
  {
    id: 'db/missing',
    description: 'Find document revisions that do not exist',
    api: [params.db, parameters.missing],
    method: methods.post,
    doc: docs.misc + '#post--db-_missing_revs',
    cmd: [
      'db',
      'mrevs',
      '-s',
      server,
      '-d',
      database,
      '@foo=1-0'
    ]
  },
  {
    id: 'db/diff',
    description: 'Get document revision diff',
    api: [params.db, parameters.diff],
    method: methods.post,
    doc: docs.misc + '#post--db-_revs_diff',
    cmd: [
      'db',
      'rdiff',
      '-s',
      server,
      '-d',
      database,
      '@foo=1-0'
    ]
  },
  {
    id: 'db/changes',
    description: 'Get database changes',
    api: [params.db, parameters.changes],
    method: methods.get,
    doc: docs.changes + '#get--db-_changes',
    cmd: [
      'db',
      'changes',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'db/cleanup',
    description: 'Clean view indices',
    api: [params.db, parameters.cleanup],
    method: methods.post,
    doc: docs.compact + '#post--db-_view_cleanup',
    cmd: [
      'db',
      'cleanup',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'db/commit',
    description: 'Ensure full commit',
    api: [params.db, parameters.commit],
    method: methods.post,
    doc: docs.compact + '#post--db-_ensure_full_commit',
    cmd: [
      'db',
      'commit',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'db/compact',
    description: 'Compact database',
    api: [params.db, parameters.compact],
    method: methods.post,
    doc: docs.compact + '#post--db-_compact',
    cmd: [
      'db',
      'compact',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'db/compact/ddoc',
    description: 'Compact database design document',
    api: [params.db, parameters.compact, params.ddoc],
    method: methods.post,
    doc: docs.compact + '#post--db-_compact-ddoc',
    cmd: [
      'db',
      'compact',
      '-s',
      server,
      '-d',
      mock.database.users,
      '--ddoc',
      '_auth'
    ]
  },
  {
    id: 'db/head',
    description: 'Check database existence',
    api: [params.db],
    method: methods.head,
    doc: docs.database + '#head--db',
    cmd: [
      'db',
      'head',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'db/info',
    description: 'Get database meta information',
    api: [params.db],
    method: methods.get,
    doc: docs.database + '#get--db',
    cmd: [
      'db',
      'info',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'db/limit/get',
    description: 'Get database revisions limit',
    api: [params.db, parameters.limit],
    method: methods.get,
    doc: docs.misc + '#get--db-_revs_limit',
    cmd: [
      'db',
      'limit',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'db/limit/set',
    description: 'Set database revisions limit',
    api: [params.db, parameters.limit],
    method: methods.put,
    doc: docs.misc + '#put--db-_revs_limit',
    cmd: [
      'db',
      'limit',
      '-s',
      server,
      '-d',
      database,
      1000
    ]
  },
  {
    id: 'db/rm',
    description: 'Remove database',
    api: [params.db],
    method: methods.delete,
    doc: docs.database + '#delete--db',
    cmd: [
      'db',
      'rm',
      '-s',
      server,
      database
    ]
  },
  {
    id: 'db/updates',
    description: 'Get database updates',
    api: [parameters.updates],
    method: methods.get,
    doc: docs.server + '#get--_db_updates',
    parallel: ['db/add'],
    after: ['db/rm'],
    cmd: [
      'db',
      'updates',
      '-s',
      server,
      '--feed',
      mock.cdb.feeds.longpoll
    ]
  },
]

module.exports = fixtures;
