var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

var assert = config.assert.db;

describe('rlx:', function() {
  this.timeout(5000);
  before(function(done) {
    config.db.add(done);
  })
  after(function(done) {
    config.db.rm(done);
  })
  it('should create bulk documents from template', function(done){
    var mock = config.file('database-bulk-template.json');
    var args = [
      'db',
      'bulk',
      '--no-color',
      '-s',
      config.server.default,
      '-d',
      database,
      '@docs=foo,bar',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.bulk(doc, 2);
      done();
    })
    def.parse(args);
  });
})
