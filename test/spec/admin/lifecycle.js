var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

function assert(doc, name) {
  expect(doc).to.be.an('object');
  var keys = Object.keys(doc);
  expect(keys).to.be.an('array');
  expect(keys.length).to.be.gt(0);
  if(name) {
    expect(!!~keys.indexOf(name)).to.eql(true);
  }
}

describe('rlx:', function() {
  this.timeout(5000);
  it('should list admins', function(done){
    var mock = config.file('admin-ls.json');
    var args = [
      'admin',
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      done();
    })
    def.parse(args);
  });
  it('should add admin', function(done){
    var mock = config.file('admin-add.json');
    var args = [
      'admin',
      'add',
      config.admin.name,
      config.admin.pass,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc, config.admin.name);
      done();
    })
    def.parse(args);
  });


  it('should remove admin', function(done){
    var mock = config.file('admin-rm.json');
    var args = [
      'admin',
      'rm',
      config.admin.name,
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc, config.admin.name);
      done();
    })
    def.parse(args);
  });
})
