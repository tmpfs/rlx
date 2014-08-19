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
      //console.dir(err);
      assert.illegal(err, errors);
      done();
    })
    def.parse(args);
  });
})
