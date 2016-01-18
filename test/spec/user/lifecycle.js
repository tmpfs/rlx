var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

var assert = config.assert.user;

describe('rlx:', function() {
  it('should list users', function(done){
    var mock = config.file('user-ls.json');
    var args = qt.getArguments('user', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.list(doc);
      done();
    })
    def.parse(args);
  });
  it('should list with alias and explicit subcommand', function(done){
    var mock = config.file('user-ls-command-alias.json');
    var args = qt.getArguments('user/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.list(doc);
      done();
    })
    def.parse(args);
  });
  it('should add user', function(done){
    var mock = config.file('user-add.json');
    var args = qt.getArguments('user/add', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.add(doc);
      done();
    })
    def.parse(args);
  });

  it('should list users with non-empty list', function(done){
    var mock = config.file('user-ls-after-add.json');
    var args = qt.getArguments('user', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.list(doc, true);
      done();
    })
    def.parse(args);
  });

  it('should update user password', function(done){
    var mock = config.file('user-passwd.json');
    var args = qt.getArguments('user/passwd', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.passwd(doc);
      done();
    })
    def.parse(args);
  });

  it('should get user', function(done){
    var mock = config.file('user-get.json');
    var args = qt.getArguments('user/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should remove user', function(done){
    var mock = config.file('user-rm.json');
    var args = qt.getArguments('user/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.rm(doc);
      done();
    })
    def.parse(args);
  });
})
