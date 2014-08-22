var config = require('../util/config');

var api = 'http://docs.couchdb.org/en/latest/api';
var cdb = require('cdb');
var levels = cdb.levels;
var parameters = cdb.parameters;
var methods = cdb.methods;

var params = {
  db: '{db}',
  doc: '{doc}',
  ddoc: '{ddoc}'
}

var docs = {
  server: 'server/common.html',
  database: 'database/common.html',
  config: 'server/configuration.html'
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
  {
    id: 'level',
    description: 'Get server log level',
    api: [
      parameters.config,
      cdb.config.log.name,
      cdb.config.log.keys.level],
    method: methods.get,
    doc: docs.config,
    cmd: [
      'level',
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
    id: 'db/list',
    description: 'List databases',
    api: [parameters.dbs],
    method: methods.get,
    doc: docs.server,
    cmd: [
      'db',
      'ls',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'db/changes',
    description: 'Get database changes',
    api: [params.db],
    method: [methods.get, methods.post],
    doc: docs.database,
    cmd: [
      'db',
      'changes',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/cleanup',
    description: 'Clean view indices',
    api: [params.db],
    method: methods.post,
    doc: docs.database,
    cmd: [
      'db',
      'cleanup',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/commit',
    description: 'Ensure full commit',
    api: [params.db],
    method: methods.post,
    doc: docs.database,
    cmd: [
      'db',
      'commit',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/compact',
    description: 'Compact database',
    api: [params.db],
    method: methods.post,
    doc: docs.database,
    cmd: [
      'db',
      'compact',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/compact/ddoc',
    description: 'Compact database design document',
    api: [params.db],
    method: methods.post,
    doc: docs.database,
    cmd: [
      'db',
      'compact',
      '-s',
      config.server.default,
      '-d',
      config.database.users,
      '--ddoc',
      '_auth'
    ]
  },
  {
    id: 'db/exists',
    description: 'Check database existence',
    api: [params.db],
    method: methods.head,
    doc: docs.database,
    cmd: [
      'db',
      'exists',
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
    id: 'db/limit/get',
    description: 'Get database revisions limit',
    api: [params.db],
    method: methods.get,
    doc: docs.database,
    cmd: [
      'db',
      'limit',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/limit/set',
    description: 'Set database revisions limit',
    api: [params.db],
    method: methods.put,
    doc: docs.database,
    cmd: [
      'db',
      'limit',
      '-s',
      config.server.default,
      '-d',
      config.database.default,
      1000
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

function find(id) {
  for(var i = 0;i < qt.length;i++) {
    if(qt[i].id === id) {
      qt[i].index = i;
      return qt[i];
    }
  }
  return null;
}

function update() {
  var i, k, ind, lvl, item;
  var lvls = {}, keys;

  // set up documentation urls etc.
  for(i = 0;i < qt.length;i++) {
    qt[i].req = qt[i].method + ' ' + qt[i].api.join(' ');
    qt[i].url = api + '/' + qt[i].doc
  }

  // dynamically add log level set commands
  ind = find('level').index + 1;
  for(k in levels) {
    lvls[k] = levels[k];
  }
  delete lvls.info;
  keys = Object.keys(lvls);
  keys.push('info');
  keys.reverse();
  //console.dir(keys);
  for(i = 0;i < keys.length;i++) {
    k = keys[i];
    lvl = levels[k];
    //console.dir(lvl);
    item = {
      id: 'level/' + lvl,
      description: 'Set server log level to ' + lvl,
      api: [
        parameters.config,
        cdb.config.log.name, cdb.config.log.keys.level],
      method: methods.put,
      doc: docs.config,
      cmd: [
        'level',
        k,
        '-s',
        config.server.default
      ]
    }
    //qt.push(item);
    qt.splice(ind, 0, item);
  }
}

update();

qt.api = api;
module.exports = qt;
