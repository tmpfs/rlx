var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;


var assert = {};
assert.section = function(err, errors) {
  var def = errors.ECONFIG_SECTION_REQUIRED;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

assert.key = function(err, errors) {
  var def = errors.ECONFIG_KEY_REQUIRED;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

assert.value = function(err, errors) {
  var def = errors.ECONFIG_VALUE_REQUIRED;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on config/set (missing section)', function(done){
    var args = [
      'config',
      'set',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.section(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on config/set (missing key)', function(done){
    var args = [
      'config',
      'set',
      'log',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.key(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on config/set (missing value)', function(done){
    var args = [
      'config',
      'set',
      'log',
      'level',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.value(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on config/rm (missing section)', function(done){
    var args = [
      'config',
      'rm',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.section(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on config/rm (missing key)', function(done){
    var args = [
      'config',
      'rm',
      'log',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.key(err, errors);
      done();
    })
    def.parse(args);
  });
})
