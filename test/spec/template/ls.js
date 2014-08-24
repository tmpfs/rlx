var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should list raw templates', function(done){
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
      config.assert.template.text(doc);
      done();
    })
    def.parse(args);
  });
  it('should list raw templates (explicit subcommand)', function(done){
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
      config.assert.template.text(doc);
      done();
    })
    def.parse(args);
  });
})
