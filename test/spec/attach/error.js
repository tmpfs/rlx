var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on att/ls (server required)', function(done){
    var args = [
      'att',
      'ls',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.server(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on att/ls (database required)', function(done){
    var args = [
      'att',
      'ls',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.db(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on att/ls (id required)', function(done){
    var args = [
      'att',
      'ls',
      '-d=' + config.database.default,
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.id(err, errors);
      done();
    })
    def.parse(args);
  });
})
