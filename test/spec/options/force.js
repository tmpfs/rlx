var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
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
      '--no-color',
      '-o=' + mock
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      var def = errors.EFS_FILE_EXISTS;
      expect(def).to.be.an('object');
      expect(err).to.be.instanceof(Error);
      expect(err.key).to.eql(def.key);
      done();
    })
    def.parse(args);
  });

  it('should overwrite existing file (--force)', function(done){
    var args = [
      'info',
      '--force',
      '--no-color',
      '-o=' + mock
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.info(doc);
      done();
    })
    def.parse(args);
  });
})
