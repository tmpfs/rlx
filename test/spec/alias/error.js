var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var server = config.server.default;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    setup.home.mock(done);
  })
  after(function(done) {
    teardown.home.restore(done);
  })

  it('should error on alias/add (alias name required)', function(done){
    var args = qt.getArguments('alias/add', {
      clear: true,
      args: [
        'alias',
        'add',
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });

  // alias file required
  it('should error on alias/print (alias file required)', function(done){
    var args = qt.getArguments('alias/print', {
      clear: true,
      args: [
        'alias',
        'print',
        config.alias.simple.raw,
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.aliasfile(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on alias/ls (alias file required)', function(done){
    var args = qt.getArguments('alias/ls', {
      clear: true,
      args: [
        'alias',
        'ls',
        config.alias.simple.raw,
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.aliasfile(err, errors);
      done();
    })
    def.parse(args);
  });


  it('should error on alias/add (alias file required)', function(done){
    var args = qt.getArguments('alias/add', {
      clear: true,
      args: [
        'alias',
        'add',
        config.alias.simple.raw,
        '-s',
        config.server.default
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.aliasfile(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on alias/get (alias file required)', function(done){
    var args = qt.getArguments('alias/get', {
      clear: true,
      args: [
        'alias',
        'get',
        config.alias.simple.raw
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.aliasfile(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on alias/rm (alias file required)', function(done){
    var args = qt.getArguments('alias/rm', {
      clear: true,
      args: [
        'alias',
        'rm',
        config.alias.simple.raw,
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.aliasfile(err, errors);
      done();
    })
    def.parse(args);
  });


  // initialize the alias file
  it('should initialize alias file (mock errors)', function(done){
    var mock = config.file('alias-init-errors.json');
    var args = qt.getArguments('alias/init', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.alias.init(doc, req);
      done();
    })
    def.parse(args);
  });

  // continue with other validation errors
  it('should error on alias/add (data required)', function(done){
    var args = qt.getArguments('alias/add', {
      clear: true,
      args: [
        'alias',
        'add',
        config.alias.simple.raw
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.aliasempty(err, errors);
      done();
    })
    def.parse(args);
  });


  it('should error on alias/get (alias name required)', function(done){
    var args = qt.getArguments('alias/get', {
      clear: true,
      args: [
        'alias',
        'get',
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });


  it('should error on alias/parse (alias name required)', function(done){
    var args = qt.getArguments('alias/parse', {
      clear: true,
      args: [
        'alias',
        'parse',
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on alias/rm (alias name required)', function(done){
    var args = qt.getArguments('alias/rm', {
      clear: true,
      args: [
        'alias',
        'rm',
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });

})
