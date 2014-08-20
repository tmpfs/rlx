var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

describe('rlx:', function() {
  this.timeout(10000);
  var editor, visual;
  before(function(done) {
    editor = process.env.EDITOR;
    visual = process.env.VISUAL;
    process.env.VISUAL = process.env.EDITOR = config.editor;
    config.db.add(function() {
      config.db.user.add(done);
    });
  })
  after(function(done) {
    process.env.VISUAL = visual;
    process.env.EDITOR = editor;
    config.db.rm(function() {
      config.db.user.rm(done);
    });
  })
  it('should edit user document', function(done){
    var mock = config.file('edit-mock-user.json');
    var args = [
      'user',
      'edit',
      '-s=' + config.server.default,
      '--id=' + config.user.name,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object');
      expect(doc.ok).to.eql(true);
      expect(doc.id).to.eql(config.user.id);
      expect(doc.rev).to.be.a('string');
      done();
    })
    def.parse(args);
  });
});
