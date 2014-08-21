var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should error on doc/add (server required)', function(done){
    var args = [
      'doc',
      'add',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.server(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/add (database required)', function(done){
    var args = [
      'doc',
      'add',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.db(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/get (server required)', function(done){
    var args = [
      'doc',
      'get',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.server(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/get (database required)', function(done){
    var args = [
      'doc',
      'get',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.db(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/ls (server required)', function(done){
    var args = [
      'doc',
      'ls',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.server(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/ls (database required)', function(done){
    var args = [
      'doc',
      'ls',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.db(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/rev (server required)', function(done){
    var args = [
      'doc',
      'rev',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.server(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/rev (database required)', function(done){
    var args = [
      'doc',
      'rev',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.db(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/rm (server required)', function(done){
    var args = [
      'doc',
      'rm',
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.server(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/rm (database required)', function(done){
    var args = [
      'doc',
      'rm',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.db(err, errors);
      done();
    })
    def.parse(args);
  });

  it('should error on doc/add (id required)', function(done){
    var args = [
      'doc',
      'add',
      '-d=' + config.database.default,
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.id(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/get (id required)', function(done){
    var args = [
      'doc',
      'get',
      '-d=' + config.database.default,
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.id(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/ls (no db file)', function(done){
    var args = [
      'doc',
      'ls',
      '-d=' + config.database.unknown,
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.dbfile(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/rev (id required)', function(done){
    var args = [
      'doc',
      'rev',
      '-d=' + config.database.default,
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.id(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/rm (id required)', function(done){
    var args = [
      'doc',
      'rm',
      '-d=' + config.database.default,
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.id(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on doc/add (unknown template)', function(done){
    var args = [
      'doc',
      'add',
      '-d=' + config.database.default,
      '--id=' + config.document.id,
      '--template=unknown',
      '-s=' + config.server.default,
      '--no-color'
    ];
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.template(err, errors);
      done();
    })
    def.parse(args);
  });
})
