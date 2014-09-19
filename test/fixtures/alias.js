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
];

module.exports = fixtures;
