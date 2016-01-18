var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

var assert = config.assert.db;

describe('rlx:', function() {
  it('should retrieve database list', function(done){
    var mock = config.file('database-ls.json');
    var args = qt.getArguments('db/ls', {output: mock});
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
    var args = qt.getArguments('db/add', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.add(doc);
      done();
    })
    def.parse(args);
  });

  it('should check database existence', function(done){
    var mock = config.file('database-head.json');
    var args = qt.getArguments('db/head', {output: mock});
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
    var args = qt.getArguments('db/info', {output: mock});
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
    var args = qt.getArguments('db/changes', {output: mock});
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
    var args = qt.getArguments('db/commit', {output: mock});
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
    var args = qt.getArguments('db/compact', {output: mock});
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
    var args = qt.getArguments('db/compact/ddoc', {output: mock});
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
    var args = qt.getArguments('db/cleanup', {output: mock});
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
    var args = qt.getArguments('db/limit/get', {output: mock});
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
    var args = qt.getArguments('db/limit/set', {output: mock});
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
    var args = qt.getArguments('db/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.rm(doc);
      done();
    })
    def.parse(args);
  });
})
