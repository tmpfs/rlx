var config = require('../util/config');

var api = 'http://docs.couchdb.org/en/latest/api';
var cdb = require('cdb');
var parameters = cdb.parameters;
var methods = cdb.methods;

var params = {
  db: '{db}',
  doc: '{doc}',
  ddoc: '{ddoc}'
}

var docs = {
  server: 'server/common.html',
  database: 'database/common.html'
}

var qt = [
  // SERVER
  {
    id: 'info',
    description: 'Get server meta information',
    api: ['/'],
    method: methods.get,
    doc: docs.server,
    cmd: [
      'info',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'tasks',
    description: 'Get active tasks',
    api: [parameters.tasks],
    method: methods.get,
    doc: docs.server,
    cmd: [
      'tasks',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'dbs',
    description: 'List databases',
    api: [parameters.dbs],
    method: methods.get,
    doc: docs.server,
    cmd: [
      'ls',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'dbupdates',
    description: 'Get database updates',
    enabled: false,
    api: [parameters.dbupdates],
    method: methods.get,
    doc: docs.server,
    cmd: [
      'updates',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'log',
    description: 'Tail log file',
    api: [parameters.log],
    method: methods.get,
    doc: docs.server,
    cmd: [
      'log',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'replicate',
    description: 'Replicate a database',
    enabled: false,
    api: [parameters.replicate],
    method: methods.post,
    doc: docs.server,
    cmd: [
      'repl',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'restart',
    description: 'Restart the server',
    api: [parameters.restart],
    method: methods.post,
    doc: docs.server,
    cmd: [
      'restart',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'stats',
    description: 'Get server statistics',
    api: [parameters.stats],
    method: methods.get,
    doc: docs.server,
    cmd: [
      'stats',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'uuids',
    description: 'Get uuids',
    api: [parameters.uuids],
    method: methods.get,
    doc: docs.server,
    cmd: [
      'uuids',
      '-s',
      config.server.default
    ]
  },

  // DATABASE
  {
    id: 'db/add',
    description: 'Create a database',
    api: [params.db],
    method: methods.put,
    doc: docs.database,
    cmd: [
      'db',
      'add',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/info',
    description: 'Get database meta information',
    api: [params.db],
    method: methods.get,
    doc: docs.database,
    cmd: [
      'db',
      'info',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/rm',
    description: 'Get database meta information',
    api: [params.db],
    method: methods.delete,
    doc: docs.database,
    cmd: [
      'db',
      'rm',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
]

for(var i = 0;i < qt.length;i++) {
  qt[i].req = qt[i].method + ' ' + qt[i].api.join(' ');
}

qt.api = api;
module.exports = qt;
