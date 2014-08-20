var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(5000);
  it('should edit local file', function(done){
    var mock = config.file('edit-local-file.json');
    var args = [
      'edit',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      //var doc = config.json(mock);
      //assert(doc);
      done();
    })
    def.parse(args);
  });
})
