var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should get session document', function(done){
    var mock = config.file('session-get.json');
    var args = [
      'session',
      'get',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.security.ctx(doc);
      done();
    })
    def.parse(args);
  });

  it('should delete session document', function(done){
    var mock = config.file('session-rm.json');
    var args = [
      'session',
      'rm',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.ok(doc);
      done();
    })
    def.parse(args);
  });
})
