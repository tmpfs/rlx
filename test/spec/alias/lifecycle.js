var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var qt = require('../../fixtures/qt');

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    setup.home.mock(done);
  })
  after(function(done) {
    teardown.home.restore(done);
  })

  it('should initialize alias file', function(done){
    var mock = config.file('alias-init.json');
    var args = qt.getArguments('alias/init', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.alias.init(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should print alias file', function(done){
    var mock = config.file('alias-print.json');
    var args = qt.getArguments('alias/print', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.alias.print(doc, config.json(req.files.alias));
      done();
    })
    def.parse(args);
  });


  it('should list aliases', function(done){
    var mock = config.file('alias-ls.json');
    var args = qt.getArguments('alias/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.alias.ls(doc);
      done();
    })
    def.parse(args);
  });

  it('should list aliases (-l)', function(done){
    var mock = config.file('alias-ls-long.json');
    var args = qt.getArguments('alias/ls/long', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.alias.lslong(doc);
      done();
    })
    def.parse(args);
  });


  it('should parse simple alias reference', function(done){
    var mock = config.file('alias-parse.json');
    var args = qt.getArguments('alias/parse', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.alias.parse(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should get alias', function(done){
    var mock = config.file('alias-get.json');
    var args = qt.getArguments('alias/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.alias.get(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should add alias', function(done){
    var mock = config.file('alias-add.json');
    var args = qt.getArguments('alias/add', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.alias.add(doc, req);
      done();
    })
    def.parse(args);
  });


  it('should error on add duplicate (alias exists)', function(done){
    var mock = config.file('alias-add.json');
    var args = qt.getArguments('alias/add',
      {output: mock, force: false});
    //console.dir(args);
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.aliasexists(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should rm alias', function(done){
    var mock = config.file('alias-rm.json');
    var args = qt.getArguments('alias/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.alias.rm(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should error on get after deletion (unknown alias)', function(done){
    var args = qt.getArguments('alias/get', {
      clear: true,
      args: [
        'alias',
        'get',
        config.alias.alt.raw
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.noalias(err, errors);
      done();
    })
    def.parse(args);
  });
})
