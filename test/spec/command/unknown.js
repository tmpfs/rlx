var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  it('should error on unknown command', function(done){
    var args = [
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.command(err, errors);
      done();
    })
    def.parse(args);
  });
})
