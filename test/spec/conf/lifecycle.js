var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var assert = config.assert.conf;

describe('rlx:', function() {
  this.timeout(5000);
  it('should get config', function(done){
    var mock = config.file('server-config.json');
    var args = [
      'config',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.all(doc);
      done();
    })
    def.parse(args);
  });

  it('should set config value', function(done){
    var mock = config.file('server-config-set-value.json');
    var args = [
      'config',
      'set',
      config.conf.section,
      config.conf.key,
      config.conf.value,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.set(doc);
      done();
    })
    def.parse(args);
  });

  it('should get config section', function(done){
    var mock = config.file('server-config-section.json');
    var args = [
      'config',
      'get',
      config.conf.section,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.section(doc);
      done();
    })
    def.parse(args);
  });
  it('should get config section value', function(done){
    var mock = config.file('server-config-section-value.json');
    var args = [
      'config',
      'get',
      config.conf.section,
      config.conf.key,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.value(doc);
      done();
    })
    def.parse(args);
  });
  it('should remove config value', function(done){
    var mock = config.file('server-config-rm-value.json');
    var args = [
      'config',
      'rm',
      config.conf.section,
      config.conf.key,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.rm(doc);
      done();
    })
    def.parse(args);
  });
})
