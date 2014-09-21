var qt = require('../../fixtures/qt');
var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default
  , server = config.server.default
  , ddoc = config.app.ddoc;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    setup.db.add(function(){
      setup.bulk.add(done);
    });
  })
  after(function(done) {
    teardown.db.rm(done);
  })

  it('should list design documents', function(done){
    var mock = config.file('app-ls.json');
    var args = qt.getArguments('app/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.list(doc, 0);
      done();
    })
    def.parse(args);
  });

  it('should push design document', function(done){
    var mock = config.file('app-push.json');
    var args = qt.getArguments('app/push', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.create(doc);
      done();
    })
    def.parse(args);
  });

  it('should push design document (minimal)', function(done){
    var mock = config.file('app-push-minimal.json');
    var args = qt.getArguments('app/push/minimal', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.create(doc, config.app.tpl.minimal.ddoc);
      done();
    })
    def.parse(args);
  });

  it('should push design document (validate)', function(done){
    var mock = config.file('app-push-validate.json');
    var args = qt.getArguments('app/push/validate', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.create(doc, config.app.tpl.validate.ddoc);
      done();
    })
    def.parse(args);
  });

  it('should push design document (view)', function(done){
    var mock = config.file('app-push-view.json');
    var args = qt.getArguments('app/push/view', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.create(doc, config.app.tpl.view.ddoc);
      done();
    })
    def.parse(args);
  });

  it('should push design document (full)', function(done){
    var mock = config.file('app-push-full.json');
    var args = qt.getArguments('app/push/full', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.create(doc, config.app.tpl.full.ddoc);
      done();
    })
    def.parse(args);
  });

  it('should list multiple design documents', function(done){
    var mock = config.file('app-ls-multiple.json');
    var args = qt.getArguments('app/ls', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.list(doc, null, 5);
      done();
    })
    def.parse(args);
  });

  it('should copy design document', function(done){
    var mock = config.file('app-cp.json');
    var args = qt.getArguments('app/cp', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.create(doc, config.app.copy);
      done();
    })
    def.parse(args);
  });

  it('should get design document', function(done){
    var mock = config.file('app-get.json');
    var args = qt.getArguments('app/get', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.get(doc);
      done();
    })
    def.parse(args);
  });

  it('should head design document', function(done){
    var mock = config.file('app-head.json');
    var args = qt.getArguments('app/head', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.head(doc);
      done();
    })
    def.parse(args);
  });

  it('should get design document info', function(done){
    var mock = config.file('app-info.json');
    var args = qt.getArguments('app/info', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.info(doc);
      done();
    })
    def.parse(args);
  });

  it('should query design document view', function(done){
    var mock = config.file('app-view.json');
    var args = qt.getArguments('app/view', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.view(doc);
      done();
    })
    def.parse(args);
  });

  it('should query design document view (include_docs)', function(done){
    var mock = config.file('app-view-include.json');
    var args = qt.getArguments('app/view/include', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.view(doc, 7, false);
      done();
    })
    def.parse(args);
  });

  it('should update null document (post)', function(done){
    var mock = config.file('app-update.json');
    var args = qt.getArguments('app/update', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.nullupdate(doc);
      done();
    })
    def.parse(args);
  });

  it('should update with document (put)', function(done){
    var mock = config.file('app-update-doc.json');
    var args = qt.getArguments('app/update/doc', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.update(doc);
      done();
    })
    def.parse(args);
  });

  it('should get updated document', function(done){
    var mock = config.file('get-updated-doc.json');
    // TODO: misc args list
    var args = [
      'doc',
      'get',
      '-s',
      server,
      '-d',
      database,
      '-i',
      config.app.updates.docid,
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.updated(doc);
      done();
    })
    def.parse(args);
  });

  it('should show null document', function(done){
    var mock = config.file('app-show.json');
    var args = qt.getArguments('app/show', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.nullshow(doc);
      done();
    })
    def.parse(args);
  });

  it('should show document', function(done){
    var mock = config.file('app-show-doc.json');
    var args = qt.getArguments('app/show/doc', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.show(doc);
      done();
    })
    def.parse(args);
  });

  it('should run list function', function(done){
    var mock = config.file('app-list.json');
    var args = qt.getArguments('app/list', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.listfunc(doc);
      done();
    })
    def.parse(args);
  });

  it('should run list function (other design document)', function(done){
    var mock = config.file('app-list-other.json');
    var args = qt.getArguments('app/list/other', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.listfunc(doc);
      done();
    })
    def.parse(args);
  });

  it('should run rewrite rule', function(done){
    var mock = config.file('app-rewrite.json');
    var args = qt.getArguments('app/rewrite', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.app.rewrite(doc);
      done();
    })
    def.parse(args);
  });

  it('should deploy application', function(done){
    var mock = config.file('app-deploy.json');
    var args = qt.getArguments('app/deploy', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('error', function(e) {
      console.dir(e);
    })
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.app.deploy(doc);
      done();
    })
    def.parse(args);
  });


  it('should remove design document', function(done){
    var mock = config.file('app-rm.json');
    var args = qt.getArguments('app/rm', {output: mock});
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.rm(doc);
      done();
    })
    def.parse(args);
  });
})
