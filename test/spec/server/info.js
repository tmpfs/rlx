var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  it('should retrieve server information', function(done){
    var mock = config.file('server-info.json');
    var args = qt.getArguments('info', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.server.info(doc);
      done();
    })
    def.parse(args);
  });
})
