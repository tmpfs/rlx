var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should retrieve server information', function(done){
    var mock = config.file('server-info.json');
    var args = [
      'info', '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.couchdb).to.be.a('string');
      expect(doc.uuid).to.be.a('string');
      expect(doc.version).to.be.a('string');
      expect(doc.vendor).to.be.an('object');
      expect(doc.vendor.version).to.be.a('string');
      expect(doc.vendor.name).to.be.a('string');
      done();
    })
    def.parse(args);
  });
})
