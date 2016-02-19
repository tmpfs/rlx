var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = config.assert.user.edit;

describe('rlx:', function() {
  before(function(done) {
    setup.edit.mock(function() {
      setup.db.add(function() {
        setup.user.add(done);
      });
    });
  })
  after(function(done) {
    teardown.edit.restore(function() {
      teardown.db.rm(function() {
        teardown.user.rm(done);
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
