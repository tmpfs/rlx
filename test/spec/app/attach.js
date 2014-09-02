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
      setup.ddoc.add(done);
    })
  })

  after(function(done) {
    teardown.ddoc.rm(function() {
      teardown.db.rm(done);
    });
  })

  it('should list attachments (design document) (empty)', function(done){
    var mock = config.file('attachment-ls-ddoc.json');
    var args = qt.getArguments('app/att/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.empty(doc);
      done();
    })
    def.parse(args);
  });

  it('should upload attachment (design document)', function(done){
    var mock = config.file('attachment-upload-ddoc.json');
    var args = qt.getArguments('app/att/up', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.up(doc, '_design/' + config.app.ddoc);
      done();
    })
    def.parse(args);
  });

  it('should download attachment (design document)', function(done){
    var mock = config.file('attachment-download-ddoc.json');
    var args = qt.getArguments('app/att/dl', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.dl(doc);
      done();
    })
    def.parse(args);
  });

  it('should head attachment (design document)', function(done){
    var mock = config.file('attachment-head-ddoc.json');
    var args = qt.getArguments('app/att/head', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.head(doc);
      done();
    })
    def.parse(args);
  });

  it('should get attachment (design document)', function(done){
    var mock = config.file('attachment-get-ddoc.json');
    var args = qt.getArguments('app/att/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should list attachments (design document)', function(done){
    var mock = config.file('attachment-ls-multi-ddoc.json');
    var args = qt.getArguments('app/att/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.list(doc, config.attachment.ddoc);
      done();
    })
    def.parse(args);
  });

  it('should upload multiple attachments (design document)', function(done){
    var mock = config.file('attachment-upload-multiple-ddoc.json');
    var args = qt.getArguments('app/att/up/multiple', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.up(doc, '_design/' + config.app.ddoc, 1);
      done();
    })
    def.parse(args);
  });

  it('should upload multiple attachments (--recursive) (design document)',
    function(done){
      var mock = config.file(
        'attachment-upload-multiple-recursive--ddoc.json');
      var args = qt.getArguments(
        'app/att/up/multiple/recursive', {output: mock});
      var def = program(require(pkg), config.name)
      def.program.on('complete', function(req) {
        var doc = config.json(mock);
        //console.dir(doc);
        config.assert.attach.up(doc, '_design/' + config.app.ddoc, 2);
        done();
      })
      def.parse(args);
    }
  );

  it('should download multiple attachments (design document)', function(done){
    var mock = config.file('attachment-download-multiple-ddoc.json');
    var args = qt.getArguments('app/att/dl/multiple', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.dl(doc, 3);
      done();
    })
    def.parse(args);
  });

  it('should remove attachment (design document)', function(done){
    var mock = config.file('attachment-rm-ddoc.json');
    var args = qt.getArguments('app/att/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.rm(doc, '_design/' + config.app.ddoc);
      done();
    })
    def.parse(args);
  });
})
