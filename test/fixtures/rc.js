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
  {
    id: 'rc/get',
    description: 'Get configuration value',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'rc',
      'get',
      mock.rc.key
    ]
  },
  {
    id: 'rc/set',
    description: 'Set configuration value',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'rc',
      'set',
      mock.rc.key,
      mock.rc.value
    ]
  },
  {
    id: 'rc/rm',
    description: 'Remove configuration value',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'rc',
      'rm',
      mock.rc.key
    ]
  },
  {
    id: 'rc/get/empty',
    description: 'Get configuration value',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    enabled: false,
    cmd: [
      'rc',
      'get'
    ]
  },
  {
    id: 'rc/set/empty',
    description: 'Set configuration value',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    enabled: false,
    cmd: [
      'rc',
      'set'
    ]
  },
  {
    id: 'rc/rm/empty',
    description: 'Remove configuration value',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    enabled: false,
    cmd: [
      'rc',
      'rm'
    ]
  },
];

module.exports = fixtures;
