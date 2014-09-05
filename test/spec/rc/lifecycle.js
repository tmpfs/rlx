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

  it('should error on re-init no --force', function(done){
    var mock = config.file('rc-reinit.json');
    var args = qt.getArguments('rc/init', {output: mock, common: false});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.fsexists(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should list rc files', function(done){
    var mock = config.file('rc-ls.json');
    var args = qt.getArguments('rc/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.ls(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should list rc files (-l)', function(done){
    var mock = config.file('rc-ls-long.json');
    var args = qt.getArguments('rc/ls/long', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.lslong(doc, req);
      done();
    })
    def.parse(args);
  });
  it('should print rc configuration', function(done){
    var mock = config.file('rc-print.json');
    var args = qt.getArguments('rc/print', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.print(doc, req);
      done();
    })
    def.parse(args);
  });
  it('should get rc configuration', function(done){
    var mock = config.file('rc-get.json');
    var args = qt.getArguments('rc/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.get(doc, req);
      //console.dir(doc);
      done();
    })
    def.parse(args);
  });
  it('should set rc configuration', function(done){
    var mock = config.file('rc-set.json');
    var args = qt.getArguments('rc/set', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req);
      //console.dir(doc);
      done();
    })
    def.parse(args);
  });
})
