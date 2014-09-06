var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');

var database = mock.database.default
  , server = mock.server.default;

var fixtures = [
  // DOCS
  {
    id: 'docs/push',
    description: 'Push bulk documents',
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
    id: 'docs/unknown',
    description: 'Unknown subcommand',
    enabled: false,
    cmd: [
      'docs',
      'unknown',
      '-s',
      server
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
