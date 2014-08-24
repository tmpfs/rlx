var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should parse template file', function(done){
    var mock = config.file('template-parse.json');
    var args = [
      'tpl',
      'parse',
      '-t',
      'user/new',
      '@id=' + config.user.id,
      '@name=' + config.user.name,
      '@password=' + config.user.pass,
      '@roles=' + config.user.roles,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.template.parse(doc);
      done();
    })
    def.parse(args);
  });
})
