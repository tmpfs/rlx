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
    process.env.VISUAL = process.env.EDITOR = 'touch';
    done();
  })
  after(function(done) {
    process.env.VISUAL = visual;
    process.env.EDITOR = editor;
    done();
  })
  it('should edit local file', function(done){
    var mock = config.file('edit-local-file.json', '{}');
    var args = [
      'edit',
      '-f=' + mock,
      '--force',
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('object').to.eql({});
      done();
    })
    def.parse(args);
  });
  it('should edit remote file', function(done){
    var mock = config.file('edit-remote-file.json');
    var args = [
      'edit',
      '-f=' + config.server.default,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      config.assert.info(doc);
      done();
    })
    def.parse(args);
  });
});
