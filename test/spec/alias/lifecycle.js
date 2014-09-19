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
      //console.dir(doc);
      config.assert.alias.get(doc, req);
      done();
    })
    def.parse(args);
  });

})
