var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(10000);
  before(function(done) {
    config.edit.mock(function() {
      config.db.add(done);
    });
  })
  after(function(done) {
    config.edit.restore(function() {
      config.db.rm(done);
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
