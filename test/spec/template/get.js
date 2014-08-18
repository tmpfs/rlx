var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

function assert(doc) {
  expect(doc).to.be.an('object');
  expect(doc._id).to.be.a('string');
  expect(doc.name).to.be.a('string');
  expect(doc.password).to.be.a('string');
  expect(doc.roles).to.be.a('string');
  expect(doc.type).to.be.a('string');
}

describe('rlx:', function() {
  this.timeout(5000);
  it('should get template', function(done){
    var mock = config.file('template-get.json');
    var args = [
      'tpl',
      'get',
      '-t',
      'user/new',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      //assert(doc);
      done();
    })
    def.parse(args);
  });
  it('should get template with file extension', function(done){
    var mock = config.file('template-get-extension.json');
    var args = [
      'tpl',
      'get',
      '-t',
      'user/new.js',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      //assert(doc);
      done();
    })
    def.parse(args);
  });
})
