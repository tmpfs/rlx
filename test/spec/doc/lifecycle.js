var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

function assert(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.id).to.eql(config.document.id);
  expect(doc.rev).to.be.a('string');
}

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    config.db.add(done);
  })
  after(function(done) {
    config.db.rm(done);
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
      assert(doc);
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
      expect(doc.total_rows).to.be.a('number');
      expect(doc.offset).to.be.a('number');
      expect(doc.rows).to.be.an('array');
      expect(doc.rows.length).to.be.gt(0);
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
      expect(doc).to.be.an('object');
      expect(doc._id).to.eql(config.document.id);
      for(var z in config.document) {
        if(z === 'id') continue;
        expect(doc[z]).to.eql(config.document[z]);
      }
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
      expect(doc).to.be.an('object');
      expect(doc.rev).to.be.a('string');
      expect(doc.size).to.be.a('number');
      done();
    })
    def.parse(args);
  });

  it('should get document revs info', function(done){
    var mock = config.file('document-revs-info.json');
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
      expect(doc).to.be.an('object');
      expect(doc._revs_info).to.be.an('array');
      expect(doc._revs_info.length).to.be.gt(0);
      var revision = doc._revs_info[0];
      expect(revision).to.be.an('object');
      expect(revision.rev).to.be.a('string');
      expect(revision.status).to.be.a('string');
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
      assert(doc);
      done();
    })
    def.parse(args);
  });
})
