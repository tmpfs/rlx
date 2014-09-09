var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');

var database = mock.database.default
  , server = mock.server.default;

var fixtures = [

  // DOCS
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
    id: 'docs/ls/long',
    description: 'List documents and include files',
    cmd: [
      'docs',
      'ls',
      '-l',
      mock.paths.docs
    ]
  },
  {
    id: 'docs/push',
    description: 'Push bulk documents',
    before: ['db/add'],
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
    id: 'docs/pull',
    description: 'Pull bulk documents',
    cmd: [
      'docs',
      'pull',
      '-s',
      server,
      '-d',
      database
    ].concat(mock.docs.ids).concat(mock.paths.docspull)
  },
  {
    id: 'docs/revs',
    description: 'Fetch multiple document revisions',
    cmd: [
      'docs',
      'revs',
      '-s',
      server,
      '-d',
      database
    ].concat(mock.docs.ids)
  },
  {
    id: 'docs/rm',
    description: 'Delete multiple documents',
    after: ['db/rm'],
    cmd: [
      'docs',
      'rm',
      '-s',
      server,
      '-d',
      database
    ].concat(mock.docs.ids)
  },


  // DISABLED
  {
    id: 'docs',
    description: 'No subcommand',
    enabled: false,
    cmd: [
      'docs'
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
  {
    id: 'docs/rm/empty',
    description: 'Delete multiple documents',
    enabled: false,
    cmd: [
      'docs',
      'rm',
      '-s',
      server,
      '-d',
      database
    ]
  },
];

module.exports = fixtures;
