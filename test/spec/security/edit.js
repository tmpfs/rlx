var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  before(function(done) {
    setup.edit.mock(function() {
      setup.db.add(function() {
        setup.doc.add(done);
      });
    });
  })
  after(function(done) {
    teardown.edit.restore(function() {
      teardown.db.rm(done);
    });
  })
  it('should edit document', function(done){
    var mock = config.file('edit-mock-security.json');
    var args = [
      'sec',
      'edit',
      '-s',
      config.server.default,
      '-d',
      config.database.default,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.security.edit(doc, false);
      done();
    })
    def.parse(args);
  });
});
