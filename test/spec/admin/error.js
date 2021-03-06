var qt = require('../../fixtures/qt');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var server = config.server.default;

describe('rlx:', function() {
  it('should error on admin/add (server required)', function(done){
    var args = qt.getArguments('admin/add', {
      clear: true,
      args: [
        'admin',
        'add',
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.server(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on admin/add (missing username)', function(done){
    var args = qt.getArguments('admin/add', {
      clear: true,
      args: [
        'admin',
        'add',
        '-s',
        server
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.few(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on admin/add (missing password)', function(done){
    var args = qt.getArguments('admin/add', {
      clear: true,
      args: [
        'admin',
        'add',
        '-s',
        server,
        config.admin.name,
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.password(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on admin/get (server required)', function(done){
    var args = qt.getArguments('admin/add', {
      clear: true,
      args: [
        'admin',
        'get'
      ]
    })
    var def = program(require(pkg), config.name);

    //console.log('admin/get before parse server value');
    //console.dir(def.program.server);
    //console.dir(args);

    var errors = def.program.errors;
    def.program.on('error', function(err) {
      //console.dir(def.program.server);
      config.error.server(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on admin/get (missing username)', function(done){
    var args = qt.getArguments('admin/add', {
      clear: true,
      args: [
        'admin',
        'get',
        '-s',
        server
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.username(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on admin/rm (server required)', function(done){
    var args = qt.getArguments('admin/add', {
      clear: true,
      args: [
        'admin',
        'rm'
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.server(err, errors);
      done();
    })
    def.parse(args);
  });
  it('should error on admin/rm (missing username)', function(done){
    var args = qt.getArguments('admin/add', {
      clear: true,
      args: [
        'admin',
        'rm',
        '-s',
        server
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('error', function(err) {
      config.error.username(err, errors);
      done();
    })
    def.parse(args);
  });
})
