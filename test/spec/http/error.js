var qt = require('../../fixtures/qt');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {

  it('should error on no subcommand', function(done){
    var args = qt.getArguments('http');
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.nosub(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on no url (GET)', function(done){
    var args = qt.getArguments('http', {args: ['get']});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on no url (PUT)', function(done){
    var args = qt.getArguments('http', {args: ['put']});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on no url (POST)', function(done){
    var args = qt.getArguments('http', {args: ['post']});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on no url (COPY)', function(done){
    var args = qt.getArguments('http', {args: ['copy']});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on no url (HEAD)', function(done){
    var args = qt.getArguments('http', {args: ['head']});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on no url (DELETE)', function(done){
    var args = qt.getArguments('http', {args: ['delete']});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });


  it('should error on no protocol', function(done){
    var args = qt.getArguments('http', {args: ['get', '/index.html']});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.protocol(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on unsupported protocol (ftp://)', function(done){
    var args = qt.getArguments('http', {args: ['get', 'ftp://localhost:5984']});
    var def = program(require(pkg), config.name)
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.protocol(err, errors);
      done();
    })
    def.parse(args);
  });

})
