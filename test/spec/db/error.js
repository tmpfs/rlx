var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = {};
assert.illegal = function(err, errors) {
  var def = errors.EILLEGAL_DATABASE_NAME;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

assert.required = function(err, errors) {
  var def = errors.EDATABASE_REQUIRED;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on db/add (illegal database name)', function(done){
    var args = [
      'db',
      'add',
      '-d=_illegal',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.illegal(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on db/add (database required)', function(done){
    var args = [
      'db',
      'add',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.required(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on db/cleanup (database required)', function(done){
    var args = [
      'db',
      'cleanup',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.required(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on db/commit (database required)', function(done){
    var args = [
      'db',
      'commit',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.required(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on db/compact (database required)', function(done){
    var args = [
      'db',
      'compact',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.required(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on db/exists (database required)', function(done){
    var args = [
      'db',
      'exists',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.required(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on db/info (database required)', function(done){
    var args = [
      'db',
      'info',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.required(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on db/limit (database required)', function(done){
    var args = [
      'db',
      'limit',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.required(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on db/rm (database required)', function(done){
    var args = [
      'db',
      'rm',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.required(err, errors);
      done();
    })
    def.parse(args);
  });
})
