var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var qt = require('../../fixtures/qt');

describe('rlx:', function() {
  this.timeout(5000);

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
