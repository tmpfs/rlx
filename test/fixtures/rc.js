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
  {
    id: 'rc/ls',
    description: 'List rc files',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'rc',
      'ls'
    ]
  },
  {
    id: 'rc/ls/long',
    description: 'List rc files -l (include contents)',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'rc',
      'ls',
      '-l'
    ]
  },
  {
    id: 'rc/print',
    description: 'Print configuration',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'rc',
      'print'
    ]
  },
];

module.exports = fixtures;
