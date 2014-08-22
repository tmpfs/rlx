var config = require('../util/config');

var api = 'http://docs.couchdb.org/en/latest/api';
var cdb = require('cdb');
var levels = cdb.levels;
var parameters = cdb.parameters;
var methods = cdb.methods;

var params = {
  server: '{server}',
  db: '{db}',
  doc: '{doc}',
  ddoc: '{ddoc}',
  section: '{section}',
  key: '{key}',
  value: '{value}',
  name: '{username}',
  pass: '{password}',
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
    api: [],
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
    doc: docs.server + '#active-tasks',
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
    doc: docs.server + '#db-updates',
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
    doc: docs.server + '#log',
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
    doc: docs.server + '#replicate',
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
    doc: docs.server + '#restart',
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
    doc: docs.server + '#stats',
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
    doc: docs.server + '#uuids',
    cmd: [
      'uuids',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'conf/set',
    description: 'Set server configuration value',
    api: [
      parameters.config,
      params.section,
      params.key
    ],
    method: methods.put,
    doc: docs.config + '#put--_config-section-key',
    cmd: [
      'conf',
      'set',
      config.conf.section,
      config.conf.key,
      config.conf.value,
      '-s',
      config.server.default
    ]
  },
  {
    id: 'conf/get',
    description: 'Get server configuration',
    api: [
      parameters.config],
    method: methods.get,
    doc: docs.config + '#config',
    cmd: [
      'conf',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'conf/get/section',
    description: 'Get server configuration section',
    api: [
      parameters.config,
      params.section
    ],
    method: methods.get,
    doc: docs.config + '#config-section',
    cmd: [
      'conf',
      'get',
      config.conf.section,
      '-s',
      config.server.default
    ]
  },
  {
    id: 'conf/get/section/key',
    description: 'Get server configuration value',
    api: [
      parameters.config,
      params.section,
      params.key
    ],
    method: methods.get,
    doc: docs.config + '#config-section-key',
    cmd: [
      'conf',
      'get',
      config.conf.section,
      config.conf.key,
      '-s',
      config.server.default
    ]
  },
  {
    id: 'conf/rm',
    description: 'Delete server configuration value',
    api: [
      parameters.config,
      params.section,
      params.key
    ],
    method: methods.delete,
    doc: docs.config + '#delete--_config-section-key',
    cmd: [
      'conf',
      'rm',
      config.conf.section,
      config.conf.key,
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
    doc: docs.config + '#config-section-key',
    cmd: [
      'level',
      '-s',
      config.server.default
    ]
  },

  // ADMIN
  {
    id: 'admin/add',
    description: 'Add an administrator',
    api: [
      parameters.config,
      cdb.config.admins.name,
      params.key
    ],
    method: methods.put,
    doc: docs.config + '#put--_config-section-key',
    cmd: [
      'admin',
      'add',
      config.admin.name,
      config.admin.pass,
      '-s',
      config.server.default
    ]
  },
  {
    id: 'admin/ls',
    description: 'List administrators',
    api: [
      parameters.config,
      cdb.config.admins.name
    ],
    method: methods.get,
    doc: docs.config + '#config-section',
    cmd: [
      'admin',
      'ls',
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '-s',
      config.server.default
    ]
  },
  {
    id: 'admin/get',
    description: 'Get an administrator',
    api: [
      parameters.config,
      cdb.config.admins.name,
      params.key
    ],
    method: methods.get,
    doc: docs.config + '#config-section-key',
    cmd: [
      'admin',
      'get',
      config.admin.name,
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '-s',
      config.server.default
    ]
  },
  {
    id: 'admin/rm',
    description: 'Remove an administrator',
    api: [
      parameters.config,
      cdb.config.admins.name,
      params.key
    ],
    method: methods.delete,
    doc: docs.config + '#delete--_config-section-key',
    cmd: [
      'admin',
      'rm',
      config.admin.name,
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
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
    doc: docs.database + '#put--db',
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
    doc: docs.server + '#all-dbs',
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
    api: [params.db, parameters.changes],
    method: methods.get,
    doc: docs.database + '#get--db-_changes',
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
    api: [params.db, parameters.cleanup],
    method: methods.post,
    doc: docs.database + '#post--db-_view_cleanup',
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
    api: [params.db, parameters.commit],
    method: methods.post,
    doc: docs.database + '#post--db-_ensure_full_commit',
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
    doc: docs.database + '#post--db-_compact',
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
    doc: docs.database + '#post--db-_compact-ddoc',
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
    doc: docs.database + '#head--db',
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
    doc: docs.database + '#get--db',
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
    api: [params.db, parameters.limit],
    method: methods.get,
    doc: docs.database + '#get--db-_revs_limit',
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
    api: [params.db, parameters.limit],
    method: methods.put,
    doc: docs.database + '#put--db-_revs_limit',
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
    description: 'Remove database',
    api: [params.db],
    method: methods.delete,
    doc: docs.database + '#delete--db',
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

  // dynamically add log level set commands
  ind = find('level').index + 1;
  for(k in levels) {
    lvls[k] = levels[k];
  }
  delete lvls.info;
  keys = Object.keys(lvls);
  keys.push('info');
  keys.reverse();
  for(i = 0;i < keys.length;i++) {
    k = keys[i];
    lvl = levels[k];
    item = {
      id: 'level/' + lvl,
      description: 'Set server log level to ' + lvl,
      api: [
        parameters.config,
        cdb.config.log.name, cdb.config.log.keys.level],
      method: methods.put,
      doc: docs.config + '#put--_config-section-key',
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

  // set up documentation urls etc.
  for(i = 0;i < qt.length;i++) {
    qt[i].req = qt[i].method + ' /' + qt[i].api.join('/');
    qt[i].url = api + '/' + qt[i].doc
  }
}

update();

qt.api = api;
qt.params = params;
module.exports = qt;
