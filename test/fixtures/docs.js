var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');

var database = mock.database.default
  , server = mock.server.default;

var fixtures = [

  // DOCS
  {
    id: 'docs',
    description: 'No subcommand',
    enabled: false,
    cmd: [
      'docs'
    ]
  },
  {
    id: 'docs/ls',
    description: 'List documents',
    cmd: [
      'docs',
      'ls',
      mock.paths.docs
    ]
  },
  {
    id: 'docs/push',
    description: 'Push bulk documents',
    before: ['db/add'],
    after: ['db/rm'],
    cmd: [
      'docs',
      'push',
      '-s',
      server,
      '-d',
      database,
      mock.paths.docs
    ]
  },
  {
    id: 'docs/push/empty',
    description: 'Push bulk documents',
    enabled: false,
    cmd: [
      'docs',
      'push',
      '-s',
      server,
      '-d',
      database
    ]
  },
  {
    id: 'docs/push/nodb',
    description: 'Push bulk documents',
    enabled: false,
    cmd: [
      'docs',
      'push',
      '-s',
      server
    ]
  },
];

module.exports = fixtures;
