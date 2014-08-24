var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve log data', function(done){
    var mock = config.file('server-log.txt');
    var args = [
      'log',
      '--raw',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      expect(doc).to.be.a('string');
      done();
    })
    def.parse(args);
  });
  it('should retrieve log data using --offset and --bytes', function(done){
    var offset = 128;
    var bytes = 128;
    var mock = config.file('server-log-offset-bytes.txt');
    var args = [
      'log',
      '--raw',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock,
      '--offset=' + offset,
      '--bytes=' + bytes
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      // NOTE: a newline is added when the log does not end with a newline
      // NOTE: so length may be bytes length exactly or bytes + 1
      expect(doc).to.be.a('string').to.have.length.of.at.least(bytes);
      done();
    })
    def.parse(args);
  });
})
