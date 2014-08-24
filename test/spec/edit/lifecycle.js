var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(10000);
  before(function(done) {
    config.edit.mock(done);
  })
  after(function(done) {
    config.edit.restore(done);
  })
  it('should edit local file', function(done){
    var mock = config.file('edit-local-file.json', '{}');
    var args = [
      'edit',
      '-f=' + mock,
      '--force',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.object(doc);
      done();
    })
    def.parse(args);
  });
  it('should edit remote file', function(done){
    var mock = config.file('edit-remote-file.json');
    var args = [
      'edit',
      '-f=' + config.server.default,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.server.info(doc);
      done();
    })
    def.parse(args);
  });
  it('should edit json literal', function(done){
    var mock = config.file('edit-json-literal.json');
    var args = [
      'edit',
      '--json={}',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.empty(doc);
      done();
    })
    def.parse(args);
  });
});
