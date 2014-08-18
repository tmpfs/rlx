var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve server statistics', function(done){
    var mock = config.file('server-stats.json');
    var args = [
      'stats',
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      var keys = Object.keys(doc);
      expect(doc).to.be.an('object');
      expect(keys).to.be.an('array');
      expect(keys.length).to.be.gt(0);
      done();
    })
    def.parse(args);
  });
})
