var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');

var fixtures = [

  // TEMPLATE
  {
    id: 'tpl/dir',
    description: 'List search paths',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'tpl',
      'dir'
    ]
  },
  {
    id: 'tpl/init',
    description: 'Copy all system templates to the user template directory',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'tpl',
      'init'
    ]
  },
  {
    id: 'tpl/init/file',
    description: 'Copy a named template file',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'tpl',
      'init',
      mock.template.name,
      mock.paths.target
    ]
  },
  {
    id: 'tpl/init/app',
    description: 'Copy a named design document application',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'tpl',
      'init',
      mock.template.design,
      mock.paths.target
    ]
  },
  {
    id: 'tpl/init/template/file',
    description: 'Copy a named template file (--template)',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'tpl',
      'init',
      '-t',
      mock.template.name,
      mock.paths.target,
      '--force'
    ]
  },
  {
    id: 'tpl/init/template/app',
    description: 'Copy a named design document application (--template)',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'tpl',
      'init',
      '-t',
      mock.template.design,
      mock.paths.target,
      '--force'
    ]
  },
  {
    id: 'tpl/init/fs/file',
    description: 'Copy file from a filesystem file reference',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'tpl',
      'init',
      mock.template.fs.file,
      mock.paths.target,
      '--force'
    ]
  },
  {
    id: 'tpl/init/fs/app',
    description: 'Copy directory from a filesystem directory reference',
    before: [setup.home.mock],
    after: [teardown.home.restore],
    cmd: [
      'tpl',
      'init',
      '-t',
      mock.template.fs.design,
      mock.paths.target,
      '--force'
    ]
  },
  {
    id: 'tpl/raw',
    description: 'List raw templates (no subcommand)',
    cmd: [
      'tpl',
      '--raw'
    ]
  },
  {
    id: 'tpl/ls/raw',
    description: 'List raw templates',
    cmd: [
      'tpl',
      'ls',
      '--raw'
    ]
  },
  {
    id: 'tpl/get',
    description: 'Get a template contents',
    cmd: [
      'tpl',
      'get',
      '-t',
      mock.template.name
    ]
  },
  {
    id: 'tpl/get/extension',
    description: 'Get a template contents (file extension specified)',
    cmd: [
      'tpl',
      'get',
      '-t',
      mock.template.file
    ]
  },
  {
    id: 'tpl/parse',
    description: 'Parse a template file',
    cmd: [
      'tpl',
      'parse',
      '-t',
      mock.template.name,
      '@id=' + mock.user.id,
      '@name=' + mock.user.name,
      '@password=' + mock.user.password,
      '@roles=' + mock.user.roles
    ]
  },
];

module.exports = fixtures;
