var config = require('../util/config');

var api = 'http://docs.couchdb.org/en/latest/api';
var cdb = require('cdb');
var levels = cdb.levels;
var parameters = cdb.parameters;
var methods = cdb.methods;

var params = {
  server: '{server}',
  db: '{db}',
  docid: '{docid}',
  rev: '{rev}',
  ddoc: '{ddoc}',
  section: '{section}',
  key: '{key}',
  value: '{value}',
  name: '{username}',
  pass: '{password}',
  file: '{file}',
  template: '{template}'
}

var docs = {
  server: 'server/common.html',
  auth: 'server/authn.html',
  database: 'database/common.html',
  config: 'server/configuration.html',
  security: 'database/security.html',
  compact: 'database/compact.html',
  changes: 'database/changes.html',
  bulk: 'database/bulk-api.html',
  temp : 'database/temp-views.html',
  misc: 'database/misc.html',
  document: 'document/common.html',
}

var qt = [

  // DOCUMENT
  {
    id: 'doc/add',
    description: 'Create a document',
    api: [params.db, params.docid],
    method: methods.put,
    doc: docs.document + '#put--db-docid',
    before: ['db/add'],
    after: ['db/rm'],
    cmd: [
      'doc',
      'add',
      '-s',
      config.server.default,
      '-d',
      config.database.default,
      '-t',
      'document/new',
      '--id',
      config.document.id
    ]
  },

  // TEMPLATE
  {
    id: 'template/ls',
    description: 'List templates',
    api: null,
    method: null,
    cmd: [
      'template',
      'ls'
    ]
  },
  {
    id: 'template/get',
    description: 'Get a template',
    api: null,
    method: null,
    cmd: [
      'template',
      'get',
      '-t',
      'user/new'
    ]
  },
  {
    id: 'template/parse',
    description: 'Parse a template',
    api: null,
    method: null,
    cmd: [
      'template',
      'parse',
      '-t',
      'user/new',
      '@id=' + config.user.id,
      '@name=' + config.user.name,
      '@password=' + config.user.pass,
      '@roles=' + config.user.roles,
    ]
  },

  // SERVER
  {
    id: 'info',
    description: 'Get server meta information',
    api: [],
    method: methods.get,
    doc: docs.server + '#get--',
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
    doc: docs.server + '#get--_active_tasks',
    cmd: [
      'tasks',
      '-s',
      config.server.default
    ]
  },
  {
    id: 'log',
    description: 'Tail log file',
    api: [parameters.log],
    method: methods.get,
    doc: docs.server + '#get--_log',
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
    doc: docs.server + '#post--_replicate',
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
    doc: docs.server + '#post--_restart',
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
    doc: docs.server + '#get--_stats',
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
    doc: docs.server + '#get--_uuids',
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
    doc: docs.config + '#get--_config',
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
    doc: docs.config + '#get--_config-section',
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
    doc: docs.config + '#get--_config-section-key',
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
    doc: docs.config + '#get--_config-section-key',
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
    doc: docs.config + '#get--_config-section',
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
    doc: docs.config + '#get--_config-section-key',
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
    id: 'db/bulk',
    enabled: false,
    description: 'Bulk document modifications',
    api: [params.db, parameters.bulk],
    method: methods.post,
    doc: docs.bulk + '#post--db-_bulk_docs',
    cmd: [
      'db',
      'bulk',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/temp',
    enabled: false,
    description: 'Temporary view execution',
    api: [params.db, parameters.temp],
    method: methods.post,
    doc: docs.temp + '#post--db-_temp_view',
    cmd: [
      'db',
      'temp',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/purge',
    enabled: false,
    description: 'Purge documents',
    api: [params.db, parameters.purge],
    method: methods.post,
    doc: docs.misc + '#post--db-_purge',
    cmd: [
      'db',
      'purge',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/missing',
    enabled: false,
    description: 'Find document revisions that do not exist',
    api: [params.db, parameters.missing],
    method: methods.post,
    doc: docs.misc + '#post--db-_missing_revs',
    cmd: [
      'db',
      'missing',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'db/diff',
    enabled: false,
    description: 'Get document revision diff',
    api: [params.db, parameters.diff],
    method: methods.post,
    doc: docs.misc + '#post--db-_revs_diff',
    cmd: [
      'db',
      'diff',
      '-s',
      config.server.default,
      '-d',
      config.database.default
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
    doc: docs.compact + '#post--db-_view_cleanup',
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
    doc: docs.compact + '#post--db-_ensure_full_commit',
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
    api: [params.db, parameters.compact],
    method: methods.post,
    doc: docs.compact + '#post--db-_compact',
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
    api: [params.db, parameters.compact, params.ddoc],
    method: methods.post,
    doc: docs.compact + '#post--db-_compact-ddoc',
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
    doc: docs.misc + '#get--db-_revs_limit',
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
    doc: docs.misc + '#put--db-_revs_limit',
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
      config.server.default,
      '--feed',
      config.cdb.feeds.longpoll
    ]
  },

  // SECURITY
  {
    id: 'security/set',
    description: 'Set security document',
    api: [params.db, parameters.security],
    method: methods.put,
    doc: docs.security + '#put--db-_security',
    before: ['db/add'],
    cmd: [
      'security',
      'set',
      '-s',
      config.server.default,
      '-d',
      config.database.default,
      '--file',
      config.paths.security
    ]
  },
  {
    id: 'security/get',
    description: 'Get security document',
    api: [params.db, parameters.security],
    method: methods.get,
    doc: docs.security + '#get--db-_security',
    cmd: [
      'security',
      'get',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },
  {
    id: 'security/rm',
    description: 'Reset security document',
    api: [params.db, parameters.security],
    method: methods.put,
    doc: docs.security + '#put--db-_security',
    after: ['db/rm'],
    cmd: [
      'security',
      'rm',
      '-s',
      config.server.default,
      '-d',
      config.database.default
    ]
  },

  // SESSION
  {
    id: 'session/set',
    description: 'Login with cookie authentication',
    api: [params.db, parameters.session],
    method: methods.post,
    doc: docs.auth + '#post--_session',
    before: ['admin/add'],
    cmd: [
      'session',
      'set',
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '-s',
      config.server.default
    ]
  },
  {
    id: 'session/get',
    description: 'Get user session',
    api: [params.db, parameters.session],
    method: methods.get,
    doc: docs.auth + '#get--_session',
    cmd: [
      'session',
      'get',
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '-s',
      config.server.default
    ]
  },
  {
    id: 'session/rm',
    description: 'Logout of authenticated session',
    api: [params.db, parameters.session],
    method: methods.delete,
    doc: docs.auth + '#delete--_session',
    after: ['admin/rm'],
    cmd: [
      'session',
      'rm',
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '-s',
      config.server.default
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

var map = {};

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
      extra: ' (' + lvl + ')',
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

  function hooks(ids) {
    ids.forEach(function(id, index, arr) {
      if(!map[id]) throw new Error('unknown hook ' + id);
      arr[index] = map[id];
    })
  }

  // map by identifier
  for(i = 0;i < qt.length;i++) {
    item = qt[i];
    map[item.id] = item;
  }

  // set up documentation urls, hooks etc.
  for(i = 0;i < qt.length;i++) {
    item = qt[i];
    if(item.method && item.api && item.doc) {
      item.req = item.method + ' /' + item.api.join('/') + (item.extra || '');
      item.url = api + '/' + item.doc
    }
    if(Array.isArray(item.before)) {
      hooks(item.before);
    }
    if(Array.isArray(item.after)) {
      hooks(item.after);
    }
    if(Array.isArray(item.parallel)) {
      hooks(item.parallel);
    }
  }
}

update();

qt.api = api;
qt.map = map;
qt.params = params;
module.exports = qt;
