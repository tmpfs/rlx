var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(10000);
  it('should lint remote file', function(done){
    var mock = config.file('lint-database-info.json');
    var args = [
      'lint',
      '-f=' + config.server.default,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      console.dir(doc);
      config.assert.info(doc);
      done();
    })
    def.parse(args);
  });
})
