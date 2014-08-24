var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = config.assert.db;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve database list', function(done){
    var mock = config.file('database-ls.json');
    var args = [
      'db',
      'ls',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.list(doc);
      done();
    })
    def.parse(args);
  });
})
