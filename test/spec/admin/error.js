var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;


var assert = {};
assert.username = function(err, errors) {
  var def = errors.EUSERNAME_REQUIRED;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

assert.password = function(err, errors) {
  var def = errors.EPASSWORD_REQUIRED;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on admin/add (missing username)', function(done){
    var args = [
      'admin',
      'add',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.username(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on admin/add (missing password)', function(done){
    var args = [
      'admin',
      'add',
      config.admin.name,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.password(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on admin/get (missing username)', function(done){
    var args = [
      'admin',
      'get',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.username(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on admin/rm (missing username)', function(done){
    var args = [
      'admin',
      'rm',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      assert.username(err, errors);
      done();
    })
    def.parse(args);
  });
})
