var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
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
  it('should error on template/parse (invalid export)', function(done){
    var args = qt.getArguments(
      'tpl/parse/empty', {args: [config.template.error.etplexport]});
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.tplexport(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on template/parse (bad return object)', function(done){
    var args = qt.getArguments(
      'tpl/parse/empty', {args: [config.template.error.etplreturn]});
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.tplreturn(err, errors);
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
