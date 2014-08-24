var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var levels = require('cdb').log.levels;
var assert = config.assert.level;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve log level', function(done){
    var mock = config.file('server-log-level-get.txt');
    var args = [
      'level',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should set log level (warn)', function(done){
    var mock = config.file('server-log-level-warn.txt');
    var args = [
      'level',
      'warn',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.set(doc, levels.warn);
      done();
    })
    def.parse(args);
  });

  it('should set log level (error)', function(done){
    var mock = config.file('server-log-level-error.txt');
    var args = [
      'level',
      'error',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.set(doc, levels.error);
      done();
    })
    def.parse(args);
  });

  it('should set log level (none)', function(done){
    var mock = config.file('server-log-level-none.txt');
    var args = [
      'level',
      'none',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.set(doc, levels.none);
      done();
    })
    def.parse(args);
  });

  it('should set log level (debug)', function(done){
    var mock = config.file('server-log-level-debug.txt');
    var args = [
      'level',
      'debug',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.set(doc, levels.debug);
      done();
    })
    def.parse(args);
  });

  it('should set log level (info)', function(done){
    var mock = config.file('server-log-level-info.txt');
    var args = [
      'level',
      'info',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.set(doc, levels.info);
      done();
    })
    def.parse(args);
  });
})
