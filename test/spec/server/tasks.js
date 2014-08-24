var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = config.assert.server.tasks;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve active tasks', function(done){
    var mock = config.file('server-tasks.json');
    var args = [
      'tasks',
      '--no-color',
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
