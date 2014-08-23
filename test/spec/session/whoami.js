var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should get session document (whoami)', function(done){
    var mock = config.file('whoami.json');
    var args = [
      'whoami',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.ok).to.eql(true);
      expect(doc.userCtx).to.be.an('object');
      expect(doc.info).to.be.an('object');
      done();
    })
    def.parse(args);
  });
})
