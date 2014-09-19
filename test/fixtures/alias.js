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
];

module.exports = fixtures;
