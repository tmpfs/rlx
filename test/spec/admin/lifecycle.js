var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

var assert = config.assert.admin;

describe('rlx:', function() {
  this.timeout(5000);
  it('should list admins', function(done){
    var mock = config.file('admin-ls.json');
    var args = [
      'admin',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc, null, -1, true);
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
      '-s=' + config.server.default,
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

  it('should add alt admin', function(done){
    var mock = config.file('admin-alt-add.json');
    var args = [
      'admin',
      'add',
      config.admin.alt.name,
      config.admin.alt.pass,
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc, config.admin.alt.name);
      done();
    })
    def.parse(args);
  });

  it('should list multiple admins', function(done){
    var mock = config.file('admin-ls-multiple.json');
    var args = [
      'admin',
      'ls',
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc, null, 1, true);
      done();
    })
    def.parse(args);
  });

  it('should get admin', function(done){
    var mock = config.file('admin-get.json');
    var args = [
      'admin',
      'get',
      config.admin.name,
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc, config.admin.name, 1);
      done();
    })
    def.parse(args);
  });

  it('should remove alt admin', function(done){
    var mock = config.file('admin-alt-rm.json');
    var args = [
      'admin',
      'rm',
      config.admin.alt.name,
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert(doc, config.admin.alt.name);
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
      '-s=' + config.server.default,
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
