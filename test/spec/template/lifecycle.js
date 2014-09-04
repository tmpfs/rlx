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

  it('should list default search paths', function(done){
    var mock = config.file('template-dir.json');
    var args = qt.getArguments('tpl/dir', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.template.dir(doc, req);
      done();
    })
    def.parse(args);
  });

  it('should init templates', function(done){
    var mock = config.file('template-init.json');
    var args = qt.getArguments('tpl/init', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.template.initall(doc);
      done();
    })
    def.parse(args);
  });

  it('should error on re-init no --force', function(done){
    var mock = config.file('template-reinit.json');
    var args = qt.getArguments('tpl/init', {output: mock, common: false});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.fsexists(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should init named file template', function(done){
    var mock = config.file('template-init-file.json');
    var args = qt.getArguments('tpl/init/file', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.template.initfile(doc);
      done();
    })
    def.parse(args);
  });

  it('should init named file template with output name', function(done){
    var mock = config.file('template-init-file-output-name.json');
    var args = qt.getArguments('tpl/init/file',
      {output: mock, args: ['mock-template.js']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.template.initfile(doc, 'user/mock-template.js');
      done();
    })
    def.parse(args);
  });


  it('should init named application template', function(done){
    var mock = config.file('template-init-app.json');
    var args = qt.getArguments('tpl/init/app', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.template.initapp(doc);
      done();
    })
    def.parse(args);
  });

  it('should init named application template with output name', function(done){
    var mock = config.file('template-init-app-output-name.json');
    var args = qt.getArguments('tpl/init/app', {output: mock});
    var args = qt.getArguments('tpl/init/app',
      {output: mock, args: ['mock-app']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.template.initapp(doc, 'design/mock-app');
      done();
    })
    def.parse(args);
  });

  it('should init named file template (-t)', function(done){
    var mock = config.file('template-init-template-file.json');
    var args = qt.getArguments('tpl/init/template/file', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.template.initfile(doc);
      done();
    })
    def.parse(args);
  });

  it('should init named file template (-t) with output name', function(done){
    var mock = config.file('template-init-template-file-output-name.json');
    var args = qt.getArguments('tpl/init/template/file',
      {output: mock, args: ['mock-template.js']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.template.initfile(doc, 'user/mock-template.js');
      done();
    })
    def.parse(args);
  });

  it('should init named application template (-t)', function(done){
    var mock = config.file('template-init-template-app.json');
    var args = qt.getArguments('tpl/init/template/app', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.template.initapp(doc);
      done();
    })
    def.parse(args);
  });

  it('should init named application template (-t) with output name', function(done){
    var mock = config.file('template-init-template-app-output-name.json');
    var args = qt.getArguments('tpl/init/template/app',
      {output: mock, args: ['mock-app']});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.template.initapp(doc, 'design/mock-app');
      done();
    })
    def.parse(args);
  });

  it('should init fs file template', function(done){
    var mock = config.file('template-init-fs-file.json');
    var args = qt.getArguments('tpl/init/fs/file', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.template.initfile(doc);
      done();
    })
    def.parse(args);
  });

  it('should init fs application template', function(done){
    var mock = config.file('template-init-fs-app.json');
    var args = qt.getArguments('tpl/init/fs/app', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.template.initapp(doc);
      done();
    })
    def.parse(args);
  });

  it('should list raw templates', function(done){
    var mock = config.file('template-ls.json');
    var args = qt.getArguments('tpl/raw', {output: mock});
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
    var args = qt.getArguments('tpl/ls/raw', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      config.assert.template.text(doc);
      done();
    })
    def.parse(args);
  });

  it('should get template', function(done){
    var mock = config.file('template-get.json');
    var args = qt.getArguments('tpl/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      config.assert.generic.string(doc);
      done();
    })
    def.parse(args);
  });

  it('should get template with file extension', function(done){
    var mock = config.file('template-get-extension.json');
    var args = qt.getArguments('tpl/get/extension', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      config.assert.generic.string(doc);
      done();
    })
    def.parse(args);
  });

  it('should parse template file', function(done){
    var mock = config.file('template-parse.json');
    var args = qt.getArguments('tpl/parse', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.template.parse(doc);
      done();
    })
    def.parse(args);
  });
})
