var qt = require('../../fixtures/qt');
var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  before(function(done) {
    setup.db.add(done);
  })
  after(function(done) {
    teardown.db.rm(done);
  })

  it('should create local document', function(done){
    var mock = config.file('document-local-add.json');
    var args = qt.getArguments('lcl/add', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.create(doc, true);
      done();
    })
    def.parse(args);
  });

  it('should copy local document', function(done){
    var mock = config.file('document-local-copy.json');
    var args = qt.getArguments('lcl/cp', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.doc.create(doc, true, config.copy.id);
      done();
    })
    def.parse(args);
  });

  it('should get local document', function(done){
    var mock = config.file('document-local-get.json');
    var args = qt.getArguments('lcl/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.get(doc, true);
      done();
    })
    def.parse(args);
  });

  it('should remove local document', function(done){
    var mock = config.file('document-local-rm.json');
    var args = qt.getArguments('lcl/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.rm(doc, true);
      done();
    })
    def.parse(args);
  });
})
