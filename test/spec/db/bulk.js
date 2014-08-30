var path = require('path');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

var assert = config.assert.db;

describe('rlx:', function() {
  this.timeout(5000);
  beforeEach(function(done) {
    config.db.add(done);
  })
  afterEach(function(done) {
    config.db.rm(done);
  })
  it('should create bulk documents from template', function(done){
    var mock = config.file('database-bulk-template.json');
    var args = [
      'db',
      'bulk',
      '--no-color',
      '-s',
      config.server.default,
      '-d',
      database,
      '@docs=foo,bar',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.bulk(doc, 2);
      done();
    })
    def.parse(args);
  });
  it('should create bulk documents from file', function(done){
    var mock = config.file('database-bulk-file.json');
    var args = [
      'db',
      'bulk',
      '--no-color',
      '-s',
      config.server.default,
      '-d',
      database,
      path.join(config.paths.fixtures, 'bulk', 'id.js'),
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.bulk(doc, 1);
      done();
    })
    def.parse(args);
  });
  it('should create bulk documents from directory (--recursive)', function(done){
    var mock = config.file('database-bulk-directory.json');
    var args = [
      'db',
      'bulk',
      '--no-color',
      '-s',
      config.server.default,
      '-d',
      database,
      '--recursive',
      path.join(config.paths.fixtures, 'bulk'),
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.bulk(doc);
      done();
    })
    def.parse(args);
  });
  it('should create mix template variable and files', function(done){
    var mock = config.file('database-bulk-mixed.json');
    var args = [
      'db',
      'bulk',
      '--no-color',
      '-s',
      config.server.default,
      '-d',
      database,
      '@docs=foo,bar',
      path.join(config.paths.fixtures, 'bulk', 'id.js'),
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.bulk(doc, 3);
      done();
    })
    def.parse(args);
  });
})
