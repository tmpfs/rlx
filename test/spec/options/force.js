var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  var mock;
  before(function(done) {
    mock = config.file('force-option.json', '{}');
    done();
  })
  after(function(done) {
    config.rmfile(mock);
    done();
  })
  it('should error on existing file', function(done){
    var args = [
      'info',
      '-s=' + config.server.default,
      '--no-color',
      '-o=' + mock
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.fsexists(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should overwrite existing file (--force)', function(done){
    var args = [
      'info',
      '--force',
      '-s=' + config.server.default,
      '--no-color',
      '-o=' + mock
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.server.info(doc);
      done();
    })
    def.parse(args);
  });
})
