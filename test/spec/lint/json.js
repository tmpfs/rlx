var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(10000);
  it('should lint remote file (json)', function(done){
    var mock = config.file('lint-remote.json');
    var args = [
      'lint',
      '-f=' + config.server.default,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.server.info(doc);
      done();
    })
    def.parse(args);
  });
  it('should lint local file (json)', function(done){
    var mock = config.file('lint-local.json');
    var args = [
      'lint',
      '-f=' + pkg,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object').to.eql(require(pkg));
      done();
    })
    def.parse(args);
  });
})
