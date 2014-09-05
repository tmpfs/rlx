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
];

module.exports = fixtures;
