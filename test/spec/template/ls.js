var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

function assert(doc) {
  expect(doc).to.be.a('string');
  expect(doc).match(/user/g);
  expect(doc).match(/new\.js/g);
}

describe('rlx:', function() {
  this.timeout(5000);
  it('should list templates', function(done){
    var mock = config.file('template-ls.json');
    var args = [
      'tpl',
      '--raw',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      assert(doc);
      done();
    })
    def.parse(args);
  });
  it('should list templates (explicit subcommand)', function(done){
    var mock = config.file('template-ls-command.json');
    var args = [
      'tpl',
      'ls',
      '--raw',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      assert(doc);
      done();
    })
    def.parse(args);
  });
})
