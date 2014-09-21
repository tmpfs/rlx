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
    setup.db.add(done);
  })
  after(function(done) {
    teardown.db.rm(done);
  })

  it('should create document', function(done){
    var mock = config.file('document-add.json');
    var args = qt.getArguments('doc/add', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.create(doc);
      done();
    })
    def.parse(args);
  });

  it('should copy document', function(done){
    var mock = config.file('document-copy.json');
    var args = qt.getArguments('doc/cp', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.create(doc, false, config.copy.id);
      done();
    })
    def.parse(args);
  });

  it('should list documents', function(done){
    var mock = config.file('document-ls.json');
    var args = qt.getArguments('doc/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.list(doc);
      done();
    })
    def.parse(args);
  });

  it('should get document', function(done){
    var mock = config.file('document-get.json');
    var args = qt.getArguments('doc/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should head document', function(done){
    var mock = config.file('document-head.json');
    var args = qt.getArguments('doc/head', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.doc.head(doc);
      done();
    })
    def.parse(args);
  });

  it('should get document revision', function(done){
    var mock = config.file('document-rev.json');
    var args = qt.getArguments('doc/rev', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.rev(doc);
      done();
    })
    def.parse(args);
  });

  it('should get document revs', function(done){
    var mock = config.file('document-revs.json');
    var args = qt.getArguments('doc/revs', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.doc.revs(doc);
      done();
    })
    def.parse(args);
  });

  it('should get document meta', function(done){
    var mock = config.file('document-meta.json');
    var args = qt.getArguments('doc/meta', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      // NOTE: should at least have revs info
      config.assert.doc.revsinfo(doc);
      done();
    })
    def.parse(args);
  });

  it('should get document conflicts', function(done){
    var mock = config.file('document-conflicts.json');
    var args = qt.getArguments('doc/conflicts', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      // TODO: mock a conflict
      config.assert.doc.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should get deleted document conflicts', function(done){
    var mock = config.file('document-deleted-conflicts.json');
    var args = qt.getArguments('doc/dc', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      // TODO: mock a conflict
      config.assert.doc.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should get document revs info', function(done){
    var mock = config.file('document-revs-info.json');
    var args = qt.getArguments('doc/revsinfo', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.revsinfo(doc);
      done();
    })
    def.parse(args);
  });

  it('should get document revs info (id query string)', function(done){
    var mock = config.file('document-revs-info-query-string.json');
    var args = qt.getArguments('doc/get', {
      output: mock,
      clear: true,
      args: [
        'doc',
        'get',
        '-s=' + config.server.default,
        '-d=' + database,
        '--id=' + config.document.id + '?revs_info=true',
      ]
    });
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.revsinfo(doc);
      done();
    })
    def.parse(args);
  });

  it('should get document revs info (query option)', function(done){
    var mock = config.file('document-revs-info-query-option.json');
    var args = qt.getArguments('doc/get', {
      output: mock,
      args: [
        '--query',
        'revs_info=true',
      ]
    });
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.revsinfo(doc);
      done();
    })
    def.parse(args);
  });

  it('should remove document', function(done){
    var mock = config.file('document-rm.json');
    var args = qt.getArguments('doc/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.rm(doc);
      done();
    })
    def.parse(args);
  });
})
