var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve uuids', function(done){
    var mock = config.file('server-uuids.json');
    var args = [
      'uuids',
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.uuids).to.be.an('array').of.length(1);
      expect(doc.uuids[0]).to.be.a('string');
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
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.uuids).to.be.an('array').of.length(count);
      done();
    })
    def.parse(args);
  });
})
