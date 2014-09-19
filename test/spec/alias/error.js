var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var server = config.server.default;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on alias/add (alias name required)', function(done){
    var args = qt.getArguments('alias/add', {
      clear: true,
      args: [
        'alias',
        'add',
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });


  it('should error on alias/get (alias name required)', function(done){
    var args = qt.getArguments('alias/get', {
      clear: true,
      args: [
        'alias',
        'get',
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });


  it('should error on alias/parse (alias name required)', function(done){
    var args = qt.getArguments('alias/parse', {
      clear: true,
      args: [
        'alias',
        'parse',
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on alias/rm (alias name required)', function(done){
    var args = qt.getArguments('alias/rm', {
      clear: true,
      args: [
        'alias',
        'rm',
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });
})
