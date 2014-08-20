var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on no document', function(done){
    var args = [
      'edit',
      '--no-color'
    ];
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.document(err, errors);
      done();
    })
    def.parse(args);
  });
})
