var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  it('should logout session', function(done){
    var mock = config.file('session-logout.json');
    var args = [
      'logout',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function() {
      var doc = config.json(mock);
      config.assert.generic.ok(doc);
      done();
    })
    def.parse(args);
  });
})
