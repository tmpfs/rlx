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
      config.assert.security.ctx(doc);
      done();
    })
    def.parse(args);
  });
})
