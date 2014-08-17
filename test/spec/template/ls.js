var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should list templates', function(done){
    var mock = config.file('template-ls.json');
    var args = [
      'tpl',
      'ls',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      expect(doc).to.be.a('string');
      expect(doc).match(/user/g);
      expect(doc).match(/new\.js/g);
      done();
    })
    def.parse(args);
  });
})
