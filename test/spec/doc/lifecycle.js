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
    var args = [
      'doc',
      'add',
      '-d=' + database,
      '--id=' + config.document.id,
      '@bool=' + config.document.bool,
      '@int=' + config.document.int,
      '@float=' + config.document.float,
      '@arr=' + config.document.arr,
      '@str=' + config.document.str,
      '@nil=' + config.document.nil,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'cp',
      '-s=' + config.server.default,
      '-d=' + database,
      '-i=' + config.document.id,
      '--destination',
      config.copy.id,
      '--no-color',
      '-o', mock
    ];
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
    var args = [
      'doc',
      'ls',
      '-d=' + database,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'get',
      '-d=' + database,
      '--id=' + config.document.id,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'head',
      '-d=' + database,
      '--id=' + config.document.id,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.head(doc);
      done();
    })
    def.parse(args);
  });

  it('should get document revision', function(done){
    var mock = config.file('document-rev.json');
    var args = [
      'doc',
      'rev',
      '-d=' + database,
      '--id=' + config.document.id,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'revs',
      '-d=' + database,
      '--id=' + config.document.id,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'meta',
      '-d=' + database,
      '--id=' + config.document.id,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'conflicts',
      '-d=' + database,
      '--id=' + config.document.id,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'dc',
      '-d=' + database,
      '--id=' + config.document.id,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'revsinfo',
      '-d=' + database,
      '--id=' + config.document.id,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'get',
      '-d=' + database,
      '--id=' + config.document.id + '?revs_info=true',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'get',
      '-d=' + database,
      '--id=' + config.document.id,
      '--query',
      'revs_info=true',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
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
    var args = [
      'doc',
      'rm',
      '-d=' + database,
      '--id=' + config.document.id,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.rm(doc);
      done();
    })
    def.parse(args);
  });
})
