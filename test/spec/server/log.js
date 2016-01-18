var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  it('should retrieve raw log data', function(done){
    var mock = config.file('server-log.txt');
    var args = qt.getArguments('log/raw', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      config.assert.generic.string(doc);
      done();
    })
    def.parse(args);
  });
  it('should retrieve raw log data using --offset and --bytes', function(done){
    var offset = 128;
    var bytes = 128;
    var mock = config.file('server-log-offset-bytes.txt');
    var args = qt.getArguments('log/raw', {
      output: mock,
      args:['--offset', offset, '--bytes', bytes]
    });
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      // NOTE: a newline is added when the log does not end with a newline
      // NOTE: so length may be bytes length exactly or bytes + 1
      config.assert.log.bytes(doc, bytes);
      done();
    })
    def.parse(args);
  });
})
