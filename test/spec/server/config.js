var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  before(function(done) {
    done();
  })
  it('should retrieve config', function(done){
    var mock = config.file('server-config.json');
    var args = [
      'config',
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      var keys = Object.keys(doc);
      expect(doc).to.be.an('object');
      expect(keys).to.be.an('array');
      expect(keys.length).to.be.a('number').gt(0);
      done();
    })
    def.parse(args);
  });
  it('should retrieve config section', function(done){
    var mock = config.file('server-config-section.json');
    var args = [
      'config',
      'get',
      'uuids',
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.algorithm).to.be.a('string');
      expect(doc.max_count).to.be.a('string');
      done();
    })
    def.parse(args);
  });
  it('should retrieve config section value', function(done){
    var mock = config.file('server-config-section-value.json');
    var args = [
      'config',
      'get',
      'uuids',
      'algorithm',
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.a('string');
      done();
    })
    def.parse(args);
  });
})
