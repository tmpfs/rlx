var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on template/parse (template name required)', function(done){
    var args = [
      'tpl',
      'parse',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.tpl(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on template/parse (invalid variable)', function(done){
    var args = [
      'tpl',
      'parse',
      '-t',
      'doc/new',
      '@foo',
      'bar',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.tplvar(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on template/print (template name required)', function(done){
    var args = [
      'tpl',
      'print',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.tpl(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on template/parse (unknown template)', function(done){
    var args = [
      'tpl',
      'parse',
      '--template=unknown',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.template(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on template/print (unknown template)', function(done){
    var args = [
      'tpl',
      'print',
      '--template=unknown',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.template(err, errors);
      done();
    })
    def.parse(args);
  });
})
