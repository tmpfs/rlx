var qt = require('../../fixtures/qt');
var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {

  before(function(done) {
    setup.home.mock(done);
  })
  after(function(done) {
    teardown.home.restore(done);
  })

  it('should error on rc/get (missing key)', function(done){
    var args = qt.getArguments('rc/get/empty');
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.rckey(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on rc/set (missing key)', function(done){
    var args = qt.getArguments('rc/set/empty');
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.rckey(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on rc/rm (missing key)', function(done){
    var args = qt.getArguments('rc/rm/empty');
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.rckey(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on rc/set (missing value)', function(done){
    var args = qt.getArguments('rc/set/empty', {args: ['field']});
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.rcvalue(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on rc/set (missing file)', function(done){
    var args = qt.getArguments('rc/set/empty', {args: ['field', 'value']});
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.rcfile(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on init with invalid directory', function(done){
    var args = qt.getArguments(
      'rc/init', {args: [config.paths.security]});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.dir(err, errors);
      done();
    })
    def.parse(args);
  });

})
