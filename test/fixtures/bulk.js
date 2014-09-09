var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');

var database = mock.database.default
  , server = mock.server.default;

var fixtures = [

  // bulk
  {
    id: 'bulk/ls',
    description: 'List documents',
    cmd: [
      'bulk',
      'ls',
      mock.paths.docs
    ]
  },
  {
    id: 'bulk/ls/long',
    description: 'List documents and include files',
    cmd: [
      'bulk',
      'ls',
      '-l',
      mock.paths.docs
    ]
  },
  {
    id: 'bulk/push',
    description: 'Push bulk documents',
    before: ['db/add'],
    cmd: [
      'bulk',
      'push',
      '-s',
      server,
      '-d',
      database,
      mock.paths.docs
    ]
  },
  {
    id: 'bulk/pull',
    description: 'Pull bulk documents',
    cmd: [
      'bulk',
      'pull',
      '-s',
      server,
      '-d',
      database
    ].concat(mock.bulk.ids).concat(mock.paths.docspull)
  },
  {
    id: 'bulk/revs',
    description: 'Fetch multiple document revisions',
    cmd: [
      'bulk',
      'revs',
      '-s',
      server,
      '-d',
      database
    ].concat(mock.bulk.ids)
  },
  {
    id: 'bulk/rm',
    description: 'Delete multiple documents',
    after: ['db/rm'],
    cmd: [
      'bulk',
      'rm',
      '-s',
      server,
      '-d',
      database
    ].concat(mock.bulk.ids)
  },


  // DISABLED
  {
    id: 'bulk',
    description: 'No subcommand',
    enabled: false,
    cmd: [
      'bulk'
    ]
  },
  {
    id: 'bulk/push/empty',
    description: 'Push bulk documents',
    enabled: false,
    cmd: [
      'bulk',
      'push',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'bulk/push/nodb',
    description: 'Push bulk documents',
    enabled: false,
    cmd: [
      'bulk',
      'push',
      '-s',
      server
    ]
  },
  {
    id: 'bulk/rm/empty',
    description: 'Delete multiple documents',
    enabled: false,
    cmd: [
      'bulk',
      'rm',
      '-s',
      server,
      '-d',
      database
    ]
  },
];

module.exports = fixtures;
