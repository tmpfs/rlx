var qt = require('../../fixtures/qt');
var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  before(function(done) {
    setup.db.add(done);
  })
  after(function(done) {
    teardown.db.rm(done);
  })

  it('should get security object (default subcommand)', function(done){
    var mock = config.file('database-security-get-default-subcommand.json');
    var args = qt.getArguments('security', {output: mock})
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.empty(doc);
      done();
    })
    def.parse(args);
  });

  it('should get security object', function(done){
    var mock = config.file('database-security-get.json');
    var args = qt.getArguments('security/get', {output: mock})
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.empty(doc);
      done();
    })
    def.parse(args);
  });

  it('should set security object', function(done){
    var mock = config.file('database-security-set.json');
    var args = qt.getArguments('security/set', {output: mock})
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.ok(doc);
      done();
    })
    def.parse(args);
  });

  it('should get security object (modified)', function(done){
    var mock = config.file('database-security-get-modified.json');
    var args = qt.getArguments('security/get', {output: mock})
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.equal(doc, config.fixtures.security.data);
      done();
    })
    def.parse(args);
  });

  it('should remove security object', function(done){
    var mock = config.file('database-security-rm.json');
    var args = qt.getArguments('security/rm', {output: mock})
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.ok(doc);
      done();
    })
    def.parse(args);
  });
})
