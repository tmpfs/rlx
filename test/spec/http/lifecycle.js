var querystring = require('querystring');

var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var server = config.server.default;
var database = config.database.default;

var qt = require('../../fixtures/qt');

describe('rlx:', function() {

  before(function(done) {
    setup.alias.init(done);
  })
  after(function(done) {
    teardown.alias.unlink(done);
  })

  it('should send GET request', function(done){
    var mock = config.file('http-get.json');
    var args = qt.getArguments('http/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.server.info(doc);
      done();
    })
    def.parse(args);
  });

  it('should send PUT request', function(done){
    var mock = config.file('http-put.json');
    var args = qt.getArguments('http/put', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.db.add(doc);
      done();
    })
    def.parse(args);
  });

  it('should send POST request', function(done){
    var mock = config.file('http-post.json');
    var args = qt.getArguments('http/post', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.create(doc);
      done();
    })
    def.parse(args);
  });

  it('should send HEAD request', function(done){
    var mock = config.file('http-head.json');
    var args = qt.getArguments('http/head', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.head(doc);
      done();
    })
    def.parse(args);
  });


  it('should error on invalid rev format', function(done){
    var args = qt.getArguments('http', {
      args: [
        'get',
        server + '/' + querystring.escape(database)
          + '/' + querystring.escape(config.document.id) + '?rev=']
    });
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.badreq(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should send COPY request', function(done){
    var mock = config.file('http-copy.json');
    var args = qt.getArguments('http/copy', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.doc.create(doc, false, config.copy.id);
      done();
    })
    def.parse(args);
  });

  it('should expand alias on request', function(done){
    var mock = config.file('http-alias-expand.json');
    var args = qt.getArguments('http', {
      output: mock,
      args: [
        'get',
        config.alias.simple.raw,
      ]
    });
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.server.info(doc);
      done();
    })
    def.parse(args);
  });

  it('should send DELETE request', function(done){
    var mock = config.file('http-del.json');
    var args = qt.getArguments('http/del', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.db.rm(doc);
      done();
    })
    def.parse(args);
  });
})
