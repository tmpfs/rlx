var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');

var fixtures = [

  // RC
  {
    id: 'rc/dir',
    description: 'List search paths',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'rc',
      'dir'
    ]
  },
  {
    id: 'rc/init',
    description: 'Copy system rc file',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'rc',
      'init'
    ]
  },
];

module.exports = fixtures;
