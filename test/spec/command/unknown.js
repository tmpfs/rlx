var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on unknown command', function(done){
    var args = [
      'unknown',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      var def = errors.EUNKNOWN_COMMAND;
      expect(def).to.be.an('object');
      expect(err).to.be.instanceof(Error);
      expect(err.key).to.eql(def.key);
      done();
    })
    def.parse(args);
  });
})
