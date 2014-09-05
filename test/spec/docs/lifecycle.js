var qt = require('../../fixtures/qt');
var setup = require('../../util/setup');
var teardown = require('../../util/teardown');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    setup.db.add(done);
  })
  after(function(done) {
    teardown.db.rm(done);
  })

  it('should push documents', function(done){
    var mock = config.file('docs-push.json');
    var args = qt.getArguments('docs/push', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.push(doc);
      done();
    })
    def.parse(args);
  });

})
