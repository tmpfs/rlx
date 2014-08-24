var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    config.db.add(done);
  })
  after(function(done) {
    config.db.rm(done);
  })

  it('should get security object', function(done){
    var mock = config.file('database-security-get.json');
    var args = [
      'security',
      'get',
      '-d=' + database,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'security',
      'set',
      '-d=' + database,
      '--json=' + config.fixtures.security.doc,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'security',
      'get',
      '-d=' + database,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'security',
      'rm',
      '-d=' + database,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.ok(doc);
      done();
    })
    def.parse(args);
  });
})
