var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on unknown admin command', function(done){
    var args = [
      'admin',
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on unknown config command', function(done){
    var args = [
      'config',
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on unknown database command', function(done){
    var args = [
      'database',
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on unknown document command', function(done){
    var args = [
      'document',
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on unknown level command', function(done){
    var args = [
      'level',
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on unknown security command', function(done){
    var args = [
      'security',
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on unknown session command', function(done){
    var args = [
      'session',
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on unknown template command', function(done){
    var args = [
      'template',
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on unknown user command', function(done){
    var args = [
      'user',
      'unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });
})
