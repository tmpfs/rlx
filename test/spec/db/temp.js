var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(10000);
  before(function(done) {
    setup.edit.mock(function() {
      setup.db.add(done);
    });
  })
  after(function(done) {
    teardown.edit.restore(function() {
      teardown.db.rm(done);
    });
  })
  it('should execute temp view', function(done){
    var mock = config.file('database-view-temp.json');
    var args = [
      'db',
      'temp',
      '-s',
      config.server.default,
      '-d',
      database,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.view.temp(doc);
      done();
    })
    def.parse(args);
  });
});
