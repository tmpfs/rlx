var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  it('should error on config/set (server required)', function(done){
    var args = [
      'config',
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
  it('should error on config/set (missing section)', function(done){
    var args = [
      'config',
      'set',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.section(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on config/set (missing key)', function(done){
    var args = [
      'config',
      'set',
      'log',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.key(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on config/set (missing value)', function(done){
    var args = [
      'config',
      'set',
      'log',
      'level',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.value(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on config/get (server required)', function(done){
    var args = [
      'config',
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

  it('should error on config/rm (server required)', function(done){
    var args = [
      'config',
      'rm',
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
  it('should error on config/rm (missing section)', function(done){
    var args = [
      'config',
      'rm',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.section(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on config/rm (missing key)', function(done){
    var args = [
      'config',
      'rm',
      'log',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.key(err, errors);
      done();
    })
    def.parse(args);
  });
})
