var qt = require('../../fixtures/qt');
var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default
  , server = config.server.default
  , ddoc = config.app.ddoc;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    setup.db.add(function(){
      setup.bulk.add(done);
    });
  })
  after(function(done) {
    teardown.db.rm(done);
  })

  it('should push design document', function(done){
    var mock = config.file('app-push.json');
    var args = qt.getArguments('app/push', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.create(doc);
      done();
    })
    def.parse(args);
  });

  it('should list design documents', function(done){
    var mock = config.file('app-ls.json');
    var args = qt.getArguments('app/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.list(doc);
      done();
    })
    def.parse(args);
  });

  it('should copy design document', function(done){
    var mock = config.file('app-cp.json');
    var args = qt.getArguments('app/cp', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.create(doc, config.app.copy);
      done();
    })
    def.parse(args);
  });

  it('should list multiple design documents', function(done){
    var mock = config.file('app-ls-multiple.json');
    var args = qt.getArguments('app/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.list(doc, null, 2);
      done();
    })
    def.parse(args);
  });

  it('should get design document', function(done){
    var mock = config.file('app-get.json');
    var args = qt.getArguments('app/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should head design document', function(done){
    var mock = config.file('app-head.json');
    var args = qt.getArguments('app/head', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.head(doc);
      done();
    })
    def.parse(args);
  });

  it('should get design document info', function(done){
    var mock = config.file('app-info.json');
    var args = qt.getArguments('app/info', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.info(doc);
      done();
    })
    def.parse(args);
  });

  it('should query design document view', function(done){
    var mock = config.file('app-view.json');
    var args = qt.getArguments('app/view', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.view(doc);
      done();
    })
    def.parse(args);
  });

  it('should remove design document', function(done){
    var mock = config.file('app-rm.json');
    var args = qt.getArguments('app/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.rm(doc);
      done();
    })
    def.parse(args);
  });
})
