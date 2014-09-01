var qt = require('../../fixtures/qt');
var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    setup.db.add(function() {
      setup.doc.add(done);
    })
  })

  after(function(done) {
    teardown.doc.rm(function() {
      teardown.db.rm(done);
    });
  })

  it('should list attachments (empty)', function(done){
    var mock = config.file('attachment-ls.json');
    var args = qt.getArguments('att/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.empty(doc);
      done();
    })
    def.parse(args);
  });


  it('should upload attachment', function(done){
    var mock = config.file('attachment-upload.json');
    var args = qt.getArguments('att/up', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.attach.up(doc);
      done();
    })
    def.parse(args);
  });


  it('should download attachment', function(done){
    var mock = config.file(config.attachment.name);
    var args = qt.getArguments('att/dl');
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      config.assert.attach.dl(doc, config.attachment.doc);
      done();
    })
    def.parse(args);
  });

  it('should head attachment information', function(done){
    var mock = config.file('attachment-head.json');
    var args = qt.getArguments('att/head', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.attach.head(doc);
      done();
    })
    def.parse(args);
  });

  it('should get attachment information', function(done){
    var mock = config.file('attachment-get.json');
    var args = qt.getArguments('att/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should list attachments', function(done){
    var mock = config.file('attachment-ls-multi.json');
    var args = qt.getArguments('att/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.attach.list(doc, config.attachment.name);
      done();
    })
    def.parse(args);
  });

  it('should remove attachment', function(done){
    var mock = config.file('attachment-rm.json');
    var args = qt.getArguments('att/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.rm(doc);
      done();
    })
    def.parse(args);
  });
})
