var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = config.assert.generic.ok;

describe('rlx:', function() {
  this.timeout(10000);
  it('should restart server', function(done){
    var mock = config.file('server-restart.json');
    var args = [
      'restart',
      '--no-color',
      '--error',
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
