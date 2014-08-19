var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(5000);
  it('should create database', function(done){
    var mock = config.file('database-add.json');
    var args = [
      'db',
      'add',
      '-d=' + database,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.ok).to.eql(true);
      done();
    })
    def.parse(args);
  });

  it('should check database existence', function(done){
    var mock = config.file('database-exists.json');
    var args = [
      'db',
      'exists',
      '-d=' + database,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.ok).to.eql(true);
      done();
    })
    def.parse(args);
  });

  it('should get database info', function(done){
    var mock = config.file('database-info.json');
    var args = [
      'db',
      'info',
      '-d=' + database,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.db_name).to.eql(database);
      done();
    })
    def.parse(args);
  });

  it('should ensure full commit', function(done){
    var mock = config.file('database-commit.json');
    var args = [
      'db',
      'commit',
      '-d=' + database,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      // NOTE: this is a string, but really couch should return a number
      expect(doc.instance_start_time).to.be.a('string');
      done();
    })
    def.parse(args);
  });

  it('should compact database', function(done){
    var mock = config.file('database-compact.json');
    var args = [
      'db',
      'compact',
      '-d=' + database,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.ok).to.eql(true);
      done();
    })
    def.parse(args);
  });

  it('should cleanup view indices', function(done){
    var mock = config.file('database-cleanup.json');
    var args = [
      'db',
      'cleanup',
      '-d=' + database,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.ok).to.eql(true);
      done();
    })
    def.parse(args);
  });

  it('should get revs limit', function(done){
    var mock = config.file('database-limit-get.json');
    var args = [
      'db',
      'limit',
      '-d=' + database,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.a('number');
      done();
    })
    def.parse(args);
  });

  it('should set revs limit', function(done){
    var mock = config.file('database-limit-set.json');
    var args = [
      'db',
      'limit',
      '1000',
      '-d=' + database,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.ok).to.eql(true);
      done();
    })
    def.parse(args);
  });

  it('should remove database', function(done){
    var mock = config.file('database-rm.json');
    var args = [
      'db',
      'rm',
      '-d=' + database,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.ok).to.eql(true);
      done();
    })
    def.parse(args);
  });
})
