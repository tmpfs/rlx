var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var qt = require('../../fixtures/qt');

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    setup.home.mock(done);
  })
  after(function(done) {
    teardown.home.restore(done);
  })

  it('should list default search paths', function(done){
    var mock = config.file('rc-dir.json');
    var args = qt.getArguments('rc/dir', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.dir(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should init rc file', function(done){
    var mock = config.file('rc-init.json');
    var args = qt.getArguments('rc/init', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.init(doc, req);
      done();
    })
    def.parse(args);
  });

  //it('should error on re-init no --force', function(done){
    //var mock = config.file('template-reinit.json');
    //var args = qt.getArguments('tpl/init', {output: mock, common: false});
    //var def = program(require(pkg), config.name)
    //var errors = def.program.errors;
    //def.program.on('error', function(err) {
      //config.error.fsexists(err, errors);
      //done();
    //})
    //def.parse(args);
  //});
})
