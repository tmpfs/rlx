var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(5000);

  before(function(done) {
    config.db.add(function() {
      config.db.doc.add(done);
    });
  })
  after(function(done) {
    config.db.doc.rm(function() {
      config.db.rm(done);
    });
  })
  it('should list attachments (empty)', function(done){
    var mock = config.file('attachment-ls.json');
    var args = [
      'att',
      'ls',
      '-s',
      config.server.default,
      '-d',
      database,
      '--id',
      config.document.id,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.empty(doc);
      done();
    })
    def.parse(args);
  });
})
