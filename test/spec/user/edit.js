var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

var assert = config.assert.user.edit;

describe('rlx:', function() {
  this.timeout(10000);
  before(function(done) {
    config.edit.mock(function() {
      config.db.add(function() {
        config.db.user.add(done);
      });
    });
  })
  after(function(done) {
    config.edit.restore(function() {
      config.db.rm(function() {
        config.db.user.rm(done);
      });
    });
  })
  it('should edit user document', function(done){
    var mock = config.file('edit-mock-user.json');
    var args = [
      'user',
      'edit',
      '-s=' + config.server.default,
      '--id=' + config.user.name,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc, config.user.id);
      done();
    })
    def.parse(args);
  });
});
