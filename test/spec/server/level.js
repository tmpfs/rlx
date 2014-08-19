var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var couch = require('cdb');
var levels = couch.levels;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve log level', function(done){
    var mock = config.file('server-log-level-get.txt');
    var args = [
      'level',
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.level).to.be.a('string');
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
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.level).to.be.a('string').to.eql(levels.warn);
      expect(doc.previous).to.be.a('string');
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
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.level).to.be.a('string').to.eql(levels.error);
      expect(doc.previous).to.be.a('string');
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
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.level).to.be.a('string').to.eql(levels.none);
      expect(doc.previous).to.be.a('string');
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
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.level).to.be.a('string').to.eql(levels.debug);
      expect(doc.previous).to.be.a('string');
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
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.level).to.be.a('string').to.eql(levels.info);
      expect(doc.previous).to.be.a('string');
      done();
    })
    def.parse(args);
  });
})
