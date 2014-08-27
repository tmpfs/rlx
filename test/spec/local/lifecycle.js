var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    config.db.add(done);
  })
  after(function(done) {
    config.db.rm(done);
  })

  it('should create local document', function(done){
    var mock = config.file('document-local-add.json');
    var args = [
      'lcl',
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
      config.assert.doc.create(doc, true);
      done();
    })
    def.parse(args);
  });

  it('should copy local document', function(done){
    var mock = config.file('document-local-copy.json');
    var args = [
      'lcl',
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
      console.dir(doc);
      config.assert.doc.create(doc, true, config.copy.id);
      //process.abort();
      done();
    })
    def.parse(args);
  });

  it('should get local document', function(done){
    var mock = config.file('document-local-get.json');
    var args = [
      'lcl',
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
      config.assert.doc.get(doc, true);
      done();
    })
    def.parse(args);
  });

  it('should remove local document', function(done){
    var mock = config.file('document-local-rm.json');
    var args = [
      'lcl',
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
      config.assert.doc.rm(doc, true);
      done();
    })
    def.parse(args);
  });
})
