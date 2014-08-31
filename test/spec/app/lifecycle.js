var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default
  , server = config.server.default
  , ddoc = config.app.ddoc;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    config.db.add(done);
  })
  after(function(done) {
    config.db.rm(done);
  })

  it('should push design document', function(done){
    var mock = config.file('app-push.json');
    var args = [
      'app',
      'push',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc,
      config.fixtures.app.path,
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.create(doc);
      done();
    })
    def.parse(args);
  });

  it('should list design documents', function(done){
    var mock = config.file('app-ls.json');
    var args = [
      'app',
      'ls',
      '-s',
      server,
      '-d',
      database,
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.list(doc);
      done();
    })
    def.parse(args);
  });


  it('should get design document', function(done){
    var mock = config.file('app-get.json');
    var args = [
      'app',
      'get',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc,
      '--no-color',
      '-o',
      mock
    ];
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
    var args = [
      'app',
      'head',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc,
      '--no-color',
      '-o',
      mock
    ];
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
    var args = [
      'app',
      'info',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc,
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      config.assert.app.info(doc);
      done();
    })
    def.parse(args);
  });


  it('should remove design document', function(done){
    var mock = config.file('app-rm.json');
    var args = [
      'app',
      'rm',
      '-s',
      server,
      '-d',
      database,
      '-i',
      ddoc,
      '--no-color',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.app.rm(doc);
      done();
    })
    def.parse(args);
  });
})
