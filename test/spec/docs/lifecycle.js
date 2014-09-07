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
    var mock = config.file('docs-ls.json');
    var args = qt.getArguments('docs/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.list(doc);
      done();
    })
    def.parse(args);
  });

  it('should list documents (-l)', function(done){
    var mock = config.file('docs-ls-long.json');
    var args = qt.getArguments('docs/ls/long', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.listlong(doc);
      done();
    })
    def.parse(args);
  });


  it('should push documents', function(done){
    var mock = config.file('docs-push.json');
    var args = qt.getArguments('docs/push', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.push(doc);
      done();
    })
    def.parse(args);
  });

  it('should fetch multiple revisions', function(done){
    var mock = config.file('docs-revs.json');
    var args = qt.getArguments('docs/revs', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.revs(doc);
      done();
    })
    def.parse(args);
  });

  it('should fetch multiple revisions (--raw)', function(done){
    var mock = config.file('docs-revs-raw.json');
    var args = qt.getArguments('docs/revs', {output: mock, args: ['--raw']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.docs.revsraw(doc);
      done();
    })
    def.parse(args);
  });

  it('should fetch multiple revisions (-l)', function(done){
    var mock = config.file('docs-revs-long.json');
    var args = qt.getArguments('docs/revs', {output: mock, args: ['-l']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.revslong(doc);
      done();
    })
    def.parse(args);
  });

  it('should fetch multiple revisions (include errors)', function(done){
    var mock = config.file('docs-revs-unknown.json');
    var args = qt.getArguments(
      'docs/revs', {output: mock, args: [config.docs.unknown]});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.revserror(doc);
      done();
    })
    def.parse(args);
  });

  it('should fetch multiple revisions (omit errors --lenient)', function(done){
    var mock = config.file('docs-revs-lenient.json');
    var args = qt.getArguments(
      'docs/revs', {output: mock, args: [config.docs.unknown, '--lenient']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.revs(doc);
      done();
    })
    def.parse(args);
  });

  it('should delete multiple documents', function(done){
    var mock = config.file('docs-rm.json');
    var args = qt.getArguments('docs/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.rm(doc);
      done();
    })
    def.parse(args);
  });

  it('should delete multiple documents (with error)', function(done){
    var mock = config.file('docs-rm-error.json');
    var args = qt.getArguments(
      'docs/rm/empty', {output: mock, args: [config.docs.unknown]});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.rmerror(doc);
      done();
    })
    def.parse(args);
  });

  it('should delete multiple documents (with error --lenient)', function(done){
    var mock = config.file('docs-rm-error-lenient.json');
    var args = qt.getArguments(
      'docs/rm/empty', {output: mock, args: [config.docs.unknown, '--lenient']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.rmerrorlenient(doc);
      done();
    })
    def.parse(args);
  });

  it('should skip deletion with error and --strict', function(done){
    var mock = config.file('docs-rm-error-no-delete.json');
    var args = qt.getArguments(
      'docs/rm/empty',
      {output: mock, args: [config.docs.unknown, '--strict']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.docs.rmerrorstrict(doc);
      done();
    })
    def.parse(args);
  });
})
