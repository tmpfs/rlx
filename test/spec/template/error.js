var expect = require('chai').expect;
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
  it('should error on template/get (template name required)', function(done){
    var args = [
      'tpl',
      'get',
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
  it('should error on template/get (unknown template)', function(done){
    var args = [
      'tpl',
      'get',
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
