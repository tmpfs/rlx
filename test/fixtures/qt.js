var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');
var fsutil = require('../util/fsutil');

var database = mock.database.default
  , server = mock.server.default
  , ddoc = mock.app.ddoc;

var cdb = require('cdb');
var levels = cdb.levels;
var parameters = cdb.parameters;
var methods = cdb.methods;

var params = require('./params');
var urls = require('./urls')
  , api = urls.api
  , docs = urls.docs;

var qt = [


  // ATTACHMENTS
  {
    id: 'att/ls',
    description: 'List document attachments',
    api: [params.db, params.docid],
    method: methods.get,
    doc: docs.document + '#get--db-docid',
    before: ['doc/add'],
    group: false,
    cmd: [
      'att',
      'ls',
      '-s',
      mock.server.default,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id
    ]
  },

  {
    id: 'att/up',
    description: 'Upload attachment(s)',
    api: [params.db, params.docid, params.attname],
    method: methods.put,
    doc: docs.attachment + '#put--db-docid-attname',
    cmd: [
      'att',
      'up',
      '-s',
      mock.server.default,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id,
      mock.attachment.path,
    ]
  },
  {
    id: 'att/up/multiple',
    description: 'Upload multiple attachments',
    api: [params.db, params.docid, params.attname],
    method: methods.put,
    doc: docs.attachment + '#put--db-docid-attname',
    cmd: [
      'att',
      'up',
      '-s',
      mock.server.default,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id,
      mock.attachment.dir
    ]
  },
  {
    id: 'att/up/multiple/recursive',
    description: 'Upload multiple attachments recursively',
    api: [params.db, params.docid, params.attname],
    method: methods.put,
    doc: docs.attachment + '#put--db-docid-attname',
    cmd: [
      'att',
      'up',
      '-s',
      mock.server.default,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id,
      '--recursive',
      mock.attachment.dir
    ]
  },
  {
    id: 'att/dl',
    description: 'Download attachment(s)',
    api: [params.db, params.docid, params.attname],
    method: methods.get,
    doc: docs.attachment + '#get--db-docid-attname',
    cmd: [
      'att',
      'dl',
      '-s',
      mock.server.default,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id,
      mock.attachment.name,
      mock.paths.target,
    ]
  },
  {
    id: 'att/dl/multiple',
    description: 'Download attachment(s)',
    api: [params.db, params.docid, params.attname],
    method: methods.get,
    doc: docs.attachment + '#get--db-docid-attname',
    cmd: [
      'att',
      'dl',
      '-s',
      mock.server.default,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id,
      mock.ptn.wildcard,
      mock.paths.target,
      '--force'
    ]
  },
  {
    id: 'att/head',
    description: 'Head attachment information',
    api: [params.db, params.docid, params.attname],
    method: methods.head,
    doc: docs.attachment + '#head--db-docid-attname',
    cmd: [
      'att',
      'head',
      '-s',
      mock.server.default,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id,
      '-a',
      mock.attachment.name
    ]
  },
  {
    id: 'att/get',
    description: 'Get attachment information',
    api: [params.db, params.docid],
    method: methods.get,
    doc: docs.document + '#get--db-docid',
    group: false,
    cmd: [
      'att',
      'get',
      '-s',
      mock.server.default,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id,
      '-a',
      mock.attachment.name
    ]
  },
  {
    id: 'att/rm',
    description: 'Remove an attachment',
    api: [params.db, params.docid, params.attname],
    method: methods.delete,
    doc: docs.attachment + '#delete--db-docid-attname',
    after: ['doc/rm'],
    cmd: [
      'att',
      'rm',
      '-s',
      mock.server.default,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id,
      '-a',
      mock.attachment.name
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
      mock.server.default
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
      mock.server.default
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
      mock.server.default
    ]
  },
  {
    id: 'log/raw',
    description: 'Tail raw log file',
    api: [parameters.log],
    method: methods.get,
    doc: docs.server + '#get--_log',
    cmd: [
      'log',
      '--raw',
      '-s',
      mock.server.default
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
      mock.server.default
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
      mock.server.default
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
      mock.server.default
    ]
  },

  // CONFIG
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
      mock.conf.section,
      mock.conf.key,
      mock.conf.value,
      '-s',
      mock.server.default
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
      mock.server.default
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
      mock.conf.section,
      '-s',
      mock.server.default
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
      mock.conf.section,
      mock.conf.key,
      '-s',
      mock.server.default
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
      mock.conf.section,
      mock.conf.key,
      '-s',
      mock.server.default
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
      mock.server.default
    ]
  },

  // ADMIN
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
      '-s',
      mock.server.default
    ]
  },
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
      mock.admin.name,
      mock.admin.pass,
      '-s',
      mock.server.default
    ]
  },
  {
    id: 'admin/ls/auth',
    description: 'List administrators with credentials',
    api: [
      parameters.config,
      cdb.config.admins.name
    ],
    method: methods.get,
    doc: docs.config + '#get--_config-section',
    cmd: [
      'admin',
      'ls',
      '-s',
      mock.server.default,
      '-u',
      mock.admin.name,
      '-p',
      mock.admin.pass,
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
      mock.admin.name,
      '-u',
      mock.admin.name,
      '-p',
      mock.admin.pass,
      '-s',
      mock.server.default
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
      mock.admin.name,
      '-u',
      mock.admin.name,
      '-p',
      mock.admin.pass,
      '-s',
      mock.server.default
    ]
  },

  // REPLICATE
  {
    id: 'repl/ls',
    description: 'List active replications',
    api: [parameters.tasks],
    method: methods.get,
    doc: docs.server + '#get--_active_tasks',
    before: ['doc/add'],
    group: false,
    cmd: [
      'repl',
      'ls',
      '-s',
      mock.server.default
    ]
  },
  {
    id: 'repl/add',
    description: 'Create a replication',
    api: [parameters.replicate],
    method: methods.post,
    doc: docs.server + '#post--_replicate',
    group: false,
    cmd: [
      'repl',
      'add',
      '-s',
      mock.server.default,
      '@source=' + mock.repl.source,
      '@target=' + mock.repl.target,
      '@create_target=true',
      '@continuous=true'
    ]
  },
  {
    id: 'repl/rm',
    description: 'Remove a replication',
    api: [parameters.replicate],
    method: methods.post,
    doc: docs.server + '#post--_replicate',
    after: ['doc/rm', function(done){
      teardown.db.rm({db: mock.repl.target}, done);
    }],
    group: false,
    cmd: [
      'repl',
      'rm',
      '-s',
      mock.server.default,
      '@source=' + mock.repl.source,
      '@target=' + mock.repl.target,
      '@create_target=true',
      '@continuous=true'
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
      mock.admin.name,
      '-p',
      mock.admin.pass,
      '-s',
      mock.server.default
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
      mock.admin.name,
      '-p',
      mock.admin.pass,
      '-s',
      mock.server.default
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
      mock.admin.name,
      '-p',
      mock.admin.pass,
      '-s',
      mock.server.default
    ]
  },
  {
    id: 'login',
    description: 'Login with cookie authentication',
    api: [params.db, parameters.session],
    method: methods.post,
    doc: docs.auth + '#post--_session',
    //stdout: true,
    before: ['admin/add'],
    cmd: [
      'login',
      '-u',
      mock.admin.name,
      '-p',
      mock.admin.pass,
      '-s',
      mock.server.default
    ]
  },
  {
    id: 'whoami',
    description: 'Get user session',
    api: [params.db, parameters.session],
    method: methods.get,
    doc: docs.auth + '#get--_session',
    cmd: [
      'whoami',
      '-u',
      mock.admin.name,
      '-p',
      mock.admin.pass,
      '-s',
      mock.server.default
    ]
  },
  {
    id: 'logout',
    description: 'Logout of authenticated session',
    api: [params.db, parameters.session],
    method: methods.delete,
    doc: docs.auth + '#delete--_session',
    after: ['admin/rm'],
    cmd: [
      'logout',
      '-u',
      mock.admin.name,
      '-p',
      mock.admin.pass,
      '-s',
      mock.server.default
    ]
  },

  // APPLICATION
  {
    id: 'app/push',
    description: 'Push a design document',
    api: [params.db, parameters.design, params.ddoc],
    method: methods.put,
    doc: docs.ddoc + '#put--db-_design-ddoc',
    before: ['db/add'],
    cmd: [
      'app',
      'push',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc,
      mock.app.path
    ]
  },
  {
    id: 'app/push/minimal',
    description: 'Push a design document by template (minimal)',
    api: [params.db, parameters.design, params.ddoc],
    method: methods.put,
    doc: docs.ddoc + '#put--db-_design-ddoc',
    cmd: [
      'app',
      'push',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.app.tpl.minimal.ddoc,
      '-t',
      mock.app.tpl.minimal.name
    ]
  },
  {
    id: 'app/push/validate',
    description: 'Push a design document by template (validate)',
    cmd: [
      'app',
      'push',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.app.tpl.validate.ddoc,
      '-t',
      mock.app.tpl.validate.name
    ]
  },
  {
    id: 'app/push/view',
    description: 'Push a design document by template (view)',
    cmd: [
      'app',
      'push',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.app.tpl.view.ddoc,
      '-t',
      mock.app.tpl.view.name
    ]
  },
  {
    id: 'app/push/full',
    description: 'Push a design document by template (full)',
    cmd: [
      'app',
      'push',
      '-s',
      server,
      '-d',
      database,
      '-i',
      mock.app.tpl.full.ddoc,
      '-t',
      mock.app.tpl.full.name
    ]
  },
  {
    id: 'app/ls',
    description: 'List design documents',
    api: [params.db, parameters.docs],
    method: methods.get,
    doc: docs.bulk + '##get--db-_all_docs',
    group: false,
    cmd: [
      'app',
      'ls',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'app/cp',
    description: 'Copy a design document',
    api: [params.db, parameters.design, params.ddoc],
    method: methods.copy,
    doc: docs.ddoc + '#copy--db-_design-ddoc',
    cmd: [
      'app',
      'cp',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc,
      '--destination',
      mock.app.copy
    ]
  },
  {
    id: 'app/get',
    description: 'Get a design document',
    api: [params.db, parameters.design, params.ddoc],
    method: methods.get,
    doc: docs.ddoc + '#get--db-_design-ddoc',
    cmd: [
      'app',
      'get',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc
    ]
  },
  {
    id: 'app/head',
    description: 'Head a design document',
    api: [params.db, parameters.design, params.ddoc],
    method: methods.head,
    doc: docs.ddoc + '#head--db-_design-ddoc',
    cmd: [
      'app',
      'head',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc
    ]
  },
  {
    id: 'app/info',
    description: 'Get design document information',
    api: [params.db, parameters.design, params.ddoc, parameters.info],
    method: methods.get,
    doc: docs.ddoc + '#get--db-_design-ddoc-_info',
    cmd: [
      'app',
      'info',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc
    ]
  },
  {
    id: 'app/att/ls',
    description: 'List design document attachments',
    api: [params.db, params.docid],
    method: methods.get,
    doc: docs.document + '#get--db-docid',
    group: false,
    cmd: [
      'att',
      'ls',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc
    ]
  },
  {
    id: 'app/att/up',
    description: 'Upload design document attachment',
    api: [params.db, parameters.design, params.ddoc, params.attname],
    method: methods.put,
    doc: docs.ddoc + '#put--db-_design-ddoc-attname',
    cmd: [
      'app',
      'att',
      'up',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-a',
      mock.attachment.ddoc,
      mock.attachment.path
    ]
  },
  {
    id: 'app/att/up/multiple',
    description: 'Upload multiple attachments',
    api: [params.db, parameters.design, params.ddoc, params.attname],
    method: methods.put,
    doc: docs.ddoc + '#put--db-_design-ddoc-attname',
    cmd: [
      'app',
      'att',
      'up',
      '-s',
      server,
      '-d',
      database,
      '-ddoc',
      ddoc,
      mock.attachment.dir
    ]
  },
  {
    id: 'app/att/up/multiple/recursive',
    description: 'Upload multiple attachments recursively',
    api: [params.db, parameters.design, params.ddoc, params.attname],
    method: methods.put,
    doc: docs.ddoc + '#put--db-_design-ddoc-attname',
    cmd: [
      'app',
      'att',
      'up',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '--recursive',
      mock.attachment.dir
    ]
  },
  {
    id: 'app/att/dl',
    description: 'Download design document attachment(s)',
    api: [params.db, parameters.design, params.ddoc, params.attname],
    method: methods.get,
    doc: docs.ddoc + '#get--db-_design-ddoc-attname',
    cmd: [
      'app',
      'att',
      'dl',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      mock.attachment.ddoc,
      mock.paths.target
    ]
  },
  {
    id: 'app/att/dl/multiple',
    description: 'Download design document attachment(s)',
    api: [params.db, parameters.design, params.ddoc, params.attname],
    method: methods.get,
    doc: docs.ddoc + '#get--db-_design-ddoc-attname',
    cmd: [
      'app',
      'att',
      'dl',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      mock.ptn.wildcard,
      mock.paths.target,
      '--force'
    ]
  },
  {
    id: 'app/att/head',
    description: 'Head design document attachment information',
    api: [params.db, parameters.design, params.ddoc, params.attname],
    method: methods.head,
    doc: docs.ddoc + '#head--db-_design-ddoc-attname',
    cmd: [
      'app',
      'att',
      'head',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-a',
      mock.attachment.ddoc
    ]
  },
  {
    id: 'app/att/get',
    description: 'Get design document attachment information',
    api: [params.db, params.docid],
    method: methods.get,
    doc: docs.document + '#get--db-docid',
    group: false,
    cmd: [
      'app',
      'att',
      'get',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-a',
      mock.attachment.ddoc
    ]
  },
  {
    id: 'app/att/rm',
    description: 'Remove design document attachment',
    api: [params.db, parameters.design, params.ddoc, params.attname],
    method: methods.delete,
    doc: docs.ddoc + '#delete--db-_design-ddoc-attname',
    cmd: [
      'app',
      'att',
      'rm',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-a',
      mock.attachment.ddoc
    ]
  },
  {
    id: 'app/view',
    description: 'Query design document view',
    api: [params.db, parameters.design, params.ddoc, parameters.view, params.view],
    method: methods.get,
    doc: docs.views + '#get--db-_design-ddoc-_view-view',
    cmd: [
      'app',
      'view',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-n',
      mock.app.views.all
    ]
  },
  {
    id: 'app/view/include',
    description: 'Query design document view (include_docs)',
    api: [params.db, parameters.design, params.ddoc, parameters.view, params.view],
    method: methods.get,
    doc: docs.views + '#get--db-_design-ddoc-_view-view',
    cmd: [
      'app',
      'view',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-n',
      mock.app.views.all,
      '-q',
      'reduce=false&include_docs=true'
    ]
  },
  {
    id: 'app/update',
    description: 'Post to design document update function',
    api: [
      params.db, parameters.design, params.ddoc, parameters.update, params.func],
    method: methods.post,
    doc: docs.render + '#post--db-_design-ddoc-_update-func',
    cmd: [
      'app',
      'update',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-n',
      mock.app.updates.func
    ]
  },
  {
    id: 'app/update/doc',
    description: 'Put to design document update function',
    api: [
      params.db, parameters.design, params.ddoc, parameters.update, params.func],
    method: methods.put,
    doc: docs.render + '#put--db-_design-ddoc-_update-func-docid',
    cmd: [
      'app',
      'update',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-n',
      mock.app.updates.func,
      '-i',
      mock.app.updates.docid,
      '-f',
      mock.app.updates.file
    ]
  },
  {
    id: 'app/show',
    description: 'Run a show function with no document',
    api: [
      params.db, parameters.design, params.ddoc, parameters.show, params.func],
    method: methods.post,
    doc: docs.render + '#post--db-_design-ddoc-_show-func',
    cmd: [
      'app',
      'show',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-n',
      mock.app.shows.func
    ]
  },
  {
    id: 'app/show/doc',
    description: 'Run a document through a show function',
    api: [
      params.db,
      parameters.design,
      params.ddoc, parameters.show, params.func, params.docid],
    method: methods.post,
    doc: docs.render + '#post--db-_design-ddoc-_show-func',
    cmd: [
      'app',
      'show',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-n',
      mock.app.shows.func,
      '-i',
      mock.app.shows.docid
    ]
  },
  {
    id: 'app/list',
    description: 'Run a list function',
    api: [
      params.db, parameters.design,
      params.ddoc, parameters.list, params.func, params.view],
    method: methods.get,
    doc: docs.render + '#get--db-_design-ddoc-_list-func-view',
    cmd: [
      'app',
      'list',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-n',
      mock.app.lists.func,
      mock.app.views.all
    ]
  },
  {
    id: 'app/list/other',
    description: 'Run a list function against another design document',
    api: [
      params.db, parameters.design,
      params.ddoc, parameters.list, params.func, params.ddoc, params.view],
    method: methods.get,
    doc: docs.render + '#get--db-_design-ddoc-_list-func-view',
    cmd: [
      'app',
      'list',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      '-n',
      mock.app.lists.func,
      mock.app.copy + '/' + mock.app.views.all
    ]
  },
  {
    id: 'app/rewrite',
    description: 'Run a rewrite rule path',
    api: [
      params.db, parameters.design,
      params.ddoc, parameters.rewrite, params.path],
    method: 'ANY',
    doc: docs.rewrites + '#any--db-_design-ddoc-_rewrite-path',
    cmd: [
      'app',
      'rewrite',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc,
      mock.app.rewrites.rule
    ]
  },
  {
    id: 'app/deploy',
    description: 'Deploy an application in a live environment',
    api: [params.db, parameters.design, params.ddoc],
    method: methods.copy,
    doc: docs.ddoc + '#copy--db-_design-ddoc',
    group: false,
    cmd: [
      'app',
      'deploy',
      '-s',
      server,
      '-d',
      database,
      '--ddoc',
      ddoc
    ]
  },
  {
    id: 'app/rm',
    description: 'Remove a design document',
    api: [params.db, parameters.design, params.ddoc],
    method: methods.delete,
    doc: docs.ddoc + '#delete--db-_design-ddoc',
    after: ['db/rm'],
    cmd: [
      'app',
      'rm',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc
    ]
  },
]

var http = require('./http');
var db = require('./db');
var doc = require('./doc');
var lcl = require('./local');
var user = require('./user');
var sec = require('./sec');
var bulk = require('./bulk');
var batch = require('./batch');
var rc = require('./rc');
var tpl = require('./template');
var alias = require('./alias');
qt = http.concat(qt);
qt = db.concat(qt);
qt = doc.concat(qt);
qt = lcl.concat(qt);
qt = user.concat(qt);
qt = sec.concat(qt);
qt = bulk.concat(qt);
qt = batch.concat(qt);
qt = rc.concat(qt);
qt = tpl.concat(qt);
qt = alias.concat(qt);

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

function find(id) {
  for(var i = 0;i < qt.length;i++) {
    if(qt[i].id === id) {
      return qt[i];
    }
  }
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
      description: 'Set server log level',
      api: [
        parameters.config,
        cdb.config.log.name, cdb.config.log.keys.level],
      method: methods.put,
      doc: docs.config + '#put--_config-section-key',
      cmd: [
        'level',
        k,
        '-s',
        mock.server.default
      ]
    }
    //qt.push(item);
    qt.splice(ind, 0, item);
  }

  function hooks(ids) {
    ids.forEach(function(id, index, arr) {
      if(!map[id] && typeof id === 'string') {
        throw new Error('unknown hook ' + id);
      }
      arr[index] = typeof id === 'function' ? id : map[id];
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
      item.req = item.method + ' /' + item.api.join('/')
        + (item.query ? '?' + item.query : '');
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

function getArguments(id, opts) {
  opts = opts || {};
  opts.common = opts.common !== undefined ? opts.common : true;
  var args = [];
  var force = '--force';
  var item = find(id);
  if(item) {
    args = item.cmd.slice(0);
  }
  if(Array.isArray(opts.args)) {
    args = opts.clear ? opts.args : args.concat(opts.args);
  }
  if(opts.output) {
    args.push('-o', opts.output);
  }
  if(opts.common) {
    if(!~args.indexOf(force) && opts.force !== false) {
      args.push(force);
    }
    args.push('--no-color');
    if(!process.env.DEBUG) {
      args.push('--log-level', 'fatal');
    }else{
      args.push('--log-level', 'debug', '--log-http');
    }
  }
  args.push('--no-interactive');
  return args;
}

qt.getArguments = getArguments;
qt.api = api;
qt.map = map;
qt.params = params;
module.exports = qt;
