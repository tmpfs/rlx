var qt = require('../../fixtures/qt');
var setup = require('../../util/setup');
var teardown = require('../../util/teardown');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    setup.db.add(done);
  })
  after(function(done) {
    teardown.db.rm(done);
  })

  it('should list documents', function(done){
    var mock = config.file('bulk-ls.json');
    var args = qt.getArguments('bulk/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.list(doc);
      done();
    })
    def.parse(args);
  });

  it('should list documents (-l)', function(done){
    var mock = config.file('bulk-ls-long.json');
    var args = qt.getArguments('bulk/ls/long', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.listlong(doc);
      done();
    })
    def.parse(args);
  });


  it('should push documents', function(done){
    var mock = config.file('bulk-push.json');
    var args = qt.getArguments('bulk/push', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.push(doc);
      done();
    })
    def.parse(args);
  });

  it('should pull documents', function(done){
    var mock = config.file('bulk-pull.json');
    var args = qt.getArguments('bulk/pull', {output: mock});
    //console.dir(args);
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.bulk.pull(doc);
      done();
    })
    def.parse(args);
  });


  it('should fetch multiple revisions', function(done){
    var mock = config.file('bulk-revs.json');
    var args = qt.getArguments('bulk/revs', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.revs(doc);
      done();
    })
    def.parse(args);
  });

  it('should fetch multiple revisions (--raw)', function(done){
    var mock = config.file('bulk-revs-raw.json');
    var args = qt.getArguments('bulk/revs', {output: mock, args: ['--raw']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.bulk.revsraw(doc);
      done();
    })
    def.parse(args);
  });

  it('should fetch multiple revisions (-l)', function(done){
    var mock = config.file('bulk-revs-long.json');
    var args = qt.getArguments('bulk/revs', {output: mock, args: ['-l']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.revslong(doc);
      done();
    })
    def.parse(args);
  });

  it('should fetch multiple revisions (include errors)', function(done){
    var mock = config.file('bulk-revs-unknown.json');
    var args = qt.getArguments(
      'bulk/revs', {output: mock, args: [config.bulk.unknown]});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.revserror(doc);
      done();
    })
    def.parse(args);
  });

  it('should fetch multiple revisions (omit errors --lenient)', function(done){
    var mock = config.file('bulk-revs-lenient.json');
    var args = qt.getArguments(
      'bulk/revs', {output: mock, args: [config.bulk.unknown, '--lenient']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.revs(doc);
      done();
    })
    def.parse(args);
  });

  it('should delete multiple documents', function(done){
    var mock = config.file('bulk-rm.json');
    var args = qt.getArguments('bulk/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.rm(doc);
      done();
    })
    def.parse(args);
  });

  it('should delete multiple documents (with error)', function(done){
    var mock = config.file('bulk-rm-error.json');
    var args = qt.getArguments(
      'bulk/rm/empty', {output: mock, args: [config.bulk.unknown]});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.rmerror(doc);
      done();
    })
    def.parse(args);
  });

  it('should delete multiple documents (with error --lenient)', function(done){
    var mock = config.file('bulk-rm-error-lenient.json');
    var args = qt.getArguments(
      'bulk/rm/empty', {output: mock, args: [config.bulk.unknown, '--lenient']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.rmerrorlenient(doc);
      done();
    })
    def.parse(args);
  });

  it('should skip deletion with error and --strict', function(done){
    var mock = config.file('bulk-rm-error-no-delete.json');
    var args = qt.getArguments(
      'bulk/rm/empty',
      {output: mock, args: [config.bulk.unknown, '--strict']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.bulk.rmerrorstrict(doc);
      done();
    })
    def.parse(args);
  });
})
