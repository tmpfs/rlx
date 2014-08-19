var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on missing username', function(done){
    var args = [
      'admin',
      'add',
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
})
