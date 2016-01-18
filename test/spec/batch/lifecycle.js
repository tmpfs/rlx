var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var qt = require('../../fixtures/qt');

describe('rlx:', function() {

  it('should parse batch file (command)', function(done){
    var mock = config.file('batch-parse.json');
    var args = qt.getArguments('batch/parse', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.batch.parse(doc);
      done();
    })
    def.parse(args);
  });

  it('should execute batch file (command)', function(done){
    var mock = config.file('batch-exec.json');
    var args = qt.getArguments('batch/exec', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.batch.exec(doc, req);
      done();
    })
    def.parse(args);
  });
})
