var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = {};
assert.command = config.error('EUNKNOWN_COMMAND');

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
      assert.command(err, errors);
      done();
    })
    def.parse(args);
  });
})
