var mock = require('../util/mock');
//var setup = require('../util/setup');
//var teardown = require('../util/teardown');

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

  // SECURITY
  {
    id: 'security',
    description: 'Get security document (default subcommand)',
    api: [params.db, parameters.security],
    method: methods.get,
    doc: docs.security + '#get--db-_security',
    before: ['db/add'],
    cmd: [
      'security',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'security/set',
    description: 'Set security document',
    api: [params.db, parameters.security],
    method: methods.put,
    doc: docs.security + '#put--db-_security',
    cmd: [
      'security',
      'set',
      '-s',
      server,
      '-d',
      database,
      '--file',
      mock.paths.security
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
      server,
      '-d',
      database
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
      server,
      '-d',
      database
    ]
  },
];

module.exports = fixtures;
