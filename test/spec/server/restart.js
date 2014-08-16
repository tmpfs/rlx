var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(10000);
  before(function(done) {
    done();
  })
  it('should restart server', function(done){
    var mock = config.file('server-restart.json');
    var args = [
      'restart',
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.ok).to.eql(true);
      setTimeout(function() {
        done();
      }, 2000);
    })
    def.parse(args);
  });
})
