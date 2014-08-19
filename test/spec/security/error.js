var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = {};

assert.db = function(err, errors) {
  var def = errors.EDATABASE_REQUIRED;
  expect(def).to.be.an('object');
  expect(err).to.be.instanceof(Error);
  expect(err.key).to.eql(def.key);
}

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on security/get (database required)', function(done){
    var args = [
      'security',
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
  it('should error on security/set (database required)', function(done){
    var args = [
      'security',
      'set',
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
