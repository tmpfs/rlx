var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on header parse (bad syntax)', function(done){
    var args = [
      'tpl',
      'ls',
      '-h',
      'key',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.header(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on header parse (empty key)', function(done){
    var args = [
      'tpl',
      'ls',
      '-h',
      ' :value',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.header(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on header parse (empty value)', function(done){
    var args = [
      'tpl',
      'ls',
      '-h',
      'key: ',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.header(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should have header fields', function(done){
    var mock = config.file('header-mock.json');
    var args = [
      'tpl',
      'ls',
      '-h',
      'x-couch-full-commit: true',
      '--header',
      'if-none-match: "revision"',
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('complete', function(req) {
      config.assert.options.headers(req);
      done();
    })
    def.parse(args);
  });
})
