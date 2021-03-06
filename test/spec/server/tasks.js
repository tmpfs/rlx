var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = config.assert.server.tasks;

describe('rlx:', function() {
  it('should retrieve active tasks', function(done){
    var mock = config.file('server-tasks.json');
    var args = qt.getArguments('tasks', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc);
      done();
    })
    def.parse(args);
  });
})
