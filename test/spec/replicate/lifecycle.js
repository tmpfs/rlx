var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config')
  , pkg = config.paths.pkg
  , program = config.program
  , server = config.server.default
  , database = config.database.default;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    setup.db.add(function() {
      setup.doc.add(done);
    });
  })

  after(function(done) {
    teardown.db.rm({db: config.repl.target}, function(err) {
      if(err) return done(err);
      teardown.db.rm(done);
    });
  })

  it('should list replications (empty)', function(done){
    var mock = config.file('repl-ls.json');
    var args = [
      'repl',
      'ls',
      '-s',
      server,
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.replicate.empty(doc);
      done();
    })
    def.parse(args);
  });

  it('should add replication', function(done){
    var mock = config.file('repl-add.json');
    var args = [
      'repl',
      'add',
      '-s',
      server,
      '@source=' + config.repl.source,
      '@target=' + config.repl.target,
      '@create_target=true',
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.replicate.add(doc);
      done();
    })
    def.parse(args);
  });

  it('should add continuous replication', function(done){
    var mock = config.file('repl-continuous-add.json');
    var args = [
      'repl',
      'add',
      '-s',
      server,
      '@source=' + config.repl.source,
      '@target=' + config.repl.target,
      '@continuous=true',
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.replicate.continuous(doc);
      done();
    })
    def.parse(args);
  });

  it('should list replications', function(done){
    var mock = config.file('repl-list.json');
    var args = [
      'repl',
      'ls',
      '-s',
      server,
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.replicate.list(doc);
      done();
    })
    def.parse(args);
  });

  it('should remove continuous replication', function(done){
    var mock = config.file('repl-continuous-rm.json');
    var args = [
      'repl',
      'rm',
      '-s',
      server,
      '@source=' + config.repl.source,
      '@target=' + config.repl.target,
      '@continuous=true',
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.replicate.rm(doc);
      done();
    })
    def.parse(args);
  });
})
