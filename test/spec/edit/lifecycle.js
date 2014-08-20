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
      '--no-color'
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      //config.error.document(err, errors);
      done();
    })
    def.parse(args);
  });
});
