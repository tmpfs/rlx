var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    config.db.add(function() {
      config.db.doc.add(done);
    });
  })
  after(function(done) {
    config.db.doc.rm(function() {
      config.db.rm(done);
    });
  })
  it('should list attachments (empty)', function(done){
    var mock = config.file('attachment-ls.json');
    var args = [
      'att',
      'ls',
      '-s',
      config.server.default,
      '-d',
      database,
      '-i',
      config.document.id,
      '--no-color',
      '-o', mock
    ];
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
    var args = [
      'att',
      'up',
      '-s',
      config.server.default,
      '-d',
      database,
      '-i',
      config.document.id,
      '-f',
      config.attachment.path,
      '--no-color',
      '-o', mock
    ];
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
    var args = [
      'att',
      'dl',
      '-s',
      config.server.default,
      '-d',
      database,
      '-i',
      config.document.id,
      '-a',
      config.attachment.name,
      '-o',
      mock,
      '--no-color'
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      config.assert.attach.dl(doc, config.attachment.doc);
      done();
    })
    def.parse(args);
  });

  it('should download attachment information', function(done){
    var mock = config.file('attachment-get.json');
    var args = [
      'att',
      'get',
      '-s',
      config.server.default,
      '-d',
      database,
      '-i',
      config.document.id,
      '-a',
      config.attachment.name,
      '-o',
      mock,
      '--no-color'
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should remove attachment', function(done){
    var mock = config.file('attachment-rm.json');
    var args = [
      'att',
      'rm',
      '-s',
      config.server.default,
      '-d',
      database,
      '-i',
      config.document.id,
      '-a',
      config.attachment.name,
      '-o',
      mock,
      '--no-color'
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.attach.rm(doc);
      done();
    })
    def.parse(args);
  });
})
