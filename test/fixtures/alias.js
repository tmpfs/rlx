var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');

var fixtures = [

  // ALIAS
  {
    id: 'alias/init',
    description: 'Initialize alias file',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'alias',
      'init'
    ]
  },
  {
    id: 'alias/print',
    description: 'Print alias file',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'alias',
      'print'
    ]
  },
  {
    id: 'alias/ls',
    description: 'List aliases',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'alias',
      'ls'
    ]
  },
  {
    id: 'alias/ls/long',
    description: 'List aliases (long)',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'alias',
      'ls',
      '-l'
    ]
  },
  {
    id: 'alias/parse',
    description: 'Parse a simple alias',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'alias',
      'parse',
      mock.alias.simple.raw
    ]
  },
  {
    id: 'alias/get',
    description: 'Get an alias',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'alias',
      'get',
      mock.alias.simple.raw
    ]
  },
  {
    id: 'alias/add',
    description: 'Add an alias',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'alias',
      'add',
      mock.alias.alt.raw,
      '-s',
      mock.server.lh,
      '-d',
      mock.database.default,
      '-i',
      mock.document.id,
      '-r',
      mock.rev
    ]
  },

  {
    id: 'alias/rm',
    description: 'Remove an alias',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'alias',
      'rm',
      mock.alias.alt.raw,
    ]
  },
];

module.exports = fixtures;
