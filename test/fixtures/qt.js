var config = require('../util/config');

var api = 'http://docs.couchdb.org/en/latest/api';
var cdb = require('cdb');
var parameters = cdb.parameters;
var methods = cdb.methods;

var docs = {
  common: 'server/common.html'
}

var qt = [
  {
    id: 'info',
    description: 'Get server information',
    api: ['/'],
    method: methods.get,
    doc: docs.common,
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
    doc: docs.common,
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
    doc: docs.common,
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
    doc: docs.common,
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
    doc: docs.common,
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
    doc: docs.common,
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
    doc: docs.common,
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
    doc: docs.common,
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
    doc: docs.common,
    cmd: [
      'uuids',
      '-s',
      config.server.default
    ]
  },
]

for(var i = 0;i < qt.length;i++) {
  qt[i].req = qt[i].method + ' ' + qt[i].api.join(' ');
}

qt.api = api;
module.exports = qt;
