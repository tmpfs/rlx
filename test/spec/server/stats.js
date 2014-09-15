var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = config.assert.server.stats;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve server statistics', function(done){
    var mock = config.file('server-stats.json');
    var args = qt.getArguments('stats', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc);
      done();
    })
    def.parse(args);
  });
})
