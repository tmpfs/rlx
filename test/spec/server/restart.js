var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = config.assert.generic.ok;

describe('rlx:', function() {
  it('should restart server', function(done){
    var mock = config.file('server-restart.json');
    var args = qt.getArguments('restart', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc);
      done();
    })
    def.parse(args);
  });
})
