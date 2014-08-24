var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

var assert = config.assert.db;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve database list', function(done){
    var mock = config.file('database-ls.json');
    var args = [
      'db',
      'ls',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.list(doc);
      done();
    })
    def.parse(args);
  });
  it('should create database', function(done){
    var mock = config.file('database-add.json');
    var args = [
      'db',
      'add',
      '-d=' + database,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.add(doc);
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
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.exists(doc);
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
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.info(doc, database);
      done();
    })
    def.parse(args);
  });

  it('should get database changes', function(done){
    var mock = config.file('database-changes.json');
    var args = [
      'db',
      'changes',
      '-d=' + database,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.changes(doc);
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
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.commit(doc);
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
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.compact(doc);
      done();
    })
    def.parse(args);
  });

  it('should compact database design document', function(done){
    var mock = config.file('database-compact-design.json');
    var args = [
      'db',
      'compact',
      '-s=' + config.server.default,
      '-d=' + config.database.users,
      '--ddoc=_auth',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.compact(doc);
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
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.cleanup(doc);
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
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.getlimit(doc);
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
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.setlimit(doc);
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
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.rm(doc);
      done();
    })
    def.parse(args);
  });
})
