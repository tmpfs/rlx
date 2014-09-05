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

  it('should print rc configuration (default subcommand)', function(done){
    var mock = config.file('rc-print-subcommand.json');
    var args = qt.getArguments('rc', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.print(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should error on unknown subcommand', function(done){
    var mock = config.file('rc-unknown-subcommand.json');
    var args = qt.getArguments('rc', {args: ['unknown']});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.subcommand(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should list default search paths', function(done){
    var mock = config.file('rc-dir.json');
    var args = qt.getArguments('rc/dir', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.dir(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should init rc file', function(done){
    var mock = config.file('rc-init.json');
    var args = qt.getArguments('rc/init', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.init(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should error on re-init no --force', function(done){
    var mock = config.file('rc-reinit.json');
    var args = qt.getArguments('rc/init', {output: mock, common: false});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.fsexists(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should init rc file (overwrite)', function(done){
    var mock = config.file('rc-init-overwrite.json');
    var args = qt.getArguments(
      'rc/init', {output: mock, args: [config.usr.rlx]});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.init(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should list rc files', function(done){
    var mock = config.file('rc-ls.json');
    var args = qt.getArguments('rc/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.ls(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should list rc files (-l)', function(done){
    var mock = config.file('rc-ls-long.json');
    var args = qt.getArguments('rc/ls/long', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.lslong(doc, req);
      done();
    })
    def.parse(args);
  });
  it('should print rc configuration', function(done){
    var mock = config.file('rc-print.json');
    var args = qt.getArguments('rc/print', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.print(doc, req);
      done();
    })
    def.parse(args);
  });
  it('should get rc configuration', function(done){
    var mock = config.file('rc-get.json');
    var args = qt.getArguments('rc/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.get(doc, req);
      //console.dir(doc);
      done();
    })
    def.parse(args);
  });
  it('should set rc configuration', function(done){
    var mock = config.file('rc-set.json');
    var args = qt.getArguments('rc/set', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req);
      //console.dir(doc);
      done();
    })
    def.parse(args);
  });

  it('should rm rc configuration', function(done){
    var mock = config.file('rc-rm.json');
    var args = qt.getArguments('rc/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.rm(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (top-level string)', function(done){
    var mock = config.file('rc-set-top-level-string.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', 'value']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, 'value');
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (deep string)', function(done){
    var mock = config.file('rc-set-deep-level-string.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['object.field', 'value']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, 'value');
      done();
    })
    def.parse(args);
  });

  it('should rm rc configuration (deep string)', function(done){
    var mock = config.file('rc-rm-deep-level-string.json');
    var args = qt.getArguments('rc/rm/empty',
      {output: mock, args: ['object.field']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.rm(doc, req, 'value');
      done();
    })
    def.parse(args);
  });

  it('should rm rc configuration (top-level object)', function(done){
    var mock = config.file('rc-rm-top-level-object.json');
    var args = qt.getArguments('rc/rm/empty',
      {output: mock, args: ['object']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.rm(doc, req, {});
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (string)', function(done){
    var mock = config.file('rc-set-string.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', 'value']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, 'value');
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (boolean true)', function(done){
    var mock = config.file('rc-set-boolean-true.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', 'true']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, true);
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (boolean false)', function(done){
    var mock = config.file('rc-set-boolean-false.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', 'false']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, false);
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (null)', function(done){
    var mock = config.file('rc-set-null.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', 'null']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, null);
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (undefined)', function(done){
    var mock = config.file('rc-set-undefined.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', 'undefined']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, undefined);
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (integer)', function(done){
    var mock = config.file('rc-set-integer.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', '1024']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, 1024);
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (float)', function(done){
    var mock = config.file('rc-set-float.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', '1.67']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, 1.67);
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (delimited array)', function(done){
    var mock = config.file('rc-set-delimited-array.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', '1,2,3']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, [1,2,3]);
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (json array)', function(done){
    var mock = config.file('rc-set-json-array.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', '[1,2,3]']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, [1,2,3]);
      done();
    })
    def.parse(args);
  });

  it('should set rc configuration (json object)', function(done){
    var mock = config.file('rc-set-json-object.json');
    var args = qt.getArguments('rc/set/empty',
      {output: mock, args: ['field', '{"property": "value"}']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.set(doc, req, {property: 'value'});
      done();
    })
    def.parse(args);
  });

  it('should error on rc/set (invalid json)', function(done){
    var args = qt.getArguments('rc/set/empty', {args: ['field', '[1,2,3']});
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.rcparse(err, errors);
      done();
    })
    def.parse(args);
  });

  // clean up mock *field* property, adds value to test alternative code path
  it('should rm rc configuration (ignore additional arguments)', function(done){
    var mock = config.file('rc-rm-ignore.json');
    var args = qt.getArguments('rc/rm/empty',
      {output: mock, args: ['field', 'value']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.rc.rm(doc, req, {property: 'value'});
      done();
    })
    def.parse(args);
  });

})
