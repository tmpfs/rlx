var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on security/get (server required)', function(done){
    var args = [
      'security',
      'get',
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
  it('should error on security/get (database required)', function(done){
    var args = [
      'security',
      'get',
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
  it('should error on security/set (server required)', function(done){
    var args = [
      'security',
      'set',
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
  it('should error on security/set (database required)', function(done){
    var args = [
      'security',
      'set',
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
})
