var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = config.assert.server.uuids;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve uuids', function(done){
    var mock = config.file('server-uuids.json');
    var args = [
      'uuids',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc);
      done();
    })
    def.parse(args);
  });
  it('should retrieve uuids using --count', function(done){
    var mock = config.file('server-uuids-count.json');
    var count = 10;
    var args = [
      'uuids',
      '--count=' + count,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc, count);
      done();
    })
    def.parse(args);
  });
})
