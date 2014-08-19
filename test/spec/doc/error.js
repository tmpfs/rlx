var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = {};
assert.id= function(err, errors) {
  var def = errors.EID_REQUIRED;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

assert.db = function(err, errors) {
  var def = errors.EDATABASE_REQUIRED;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on doc/add (database required)', function(done){
    var args = [
      'doc',
      'add',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.db(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/get (database required)', function(done){
    var args = [
      'doc',
      'get',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.db(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/ls (database required)', function(done){
    var args = [
      'doc',
      'ls',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.db(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/rev (database required)', function(done){
    var args = [
      'doc',
      'rev',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.db(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/rm (database required)', function(done){
    var args = [
      'doc',
      'rm',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.db(err, errors);
      done();
    })
    def.parse(args);
  });
})
