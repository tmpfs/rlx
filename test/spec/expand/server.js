var qt = require('../../fixtures/qt');
var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var server = config.server.default
  , user = config.server.user
  , database = config.database.default
  , escaped = config.database.escaped;

describe('rlx:', function() {
  it('should expand server argument (database)', function(done){
    var mock = config.file('expand-server-database.json');
    var args = qt.getArguments('info', {
      output: mock,
      clear: true,
      args: [
      'info',
      '-s',
      server + '/' + escaped,
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('complete', function(req) {
      expect(this.server).to.eql(server);
      expect(this.database).to.eql(database);
      done();
    })
    def.parse(args);
  });
  it('should expand server argument (database+id)', function(done){
    var mock = config.file('expand-server-database-id.json');
    var args = qt.getArguments('info', {
      output: mock,
      clear: true,
      args: [
      'info',
      '-s',
      server + '/' + escaped + '/' + config.document.id,
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('complete', function(req) {
      expect(this.server).to.eql(server);
      expect(this.database).to.eql(database);
      expect(this.id).to.eql(config.document.id);
      done();
    })
    def.parse(args);
  });
  it('should expand server argument (database+id+rev)', function(done){
    var mock = config.file('expand-server-database-id-rev.json');
    var args = qt.getArguments('info', {
      output: mock,
      clear: true,
      args: [
      'info',
      '-s',
      server + '/' + escaped + '/' + config.document.id + '?rev=' + config.rev,
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('complete', function(req) {
      expect(this.server).to.eql(server);
      expect(this.database).to.eql(database);
      expect(this.id).to.eql(config.document.id);
      expect(this.rev).to.eql(config.rev);
      done();
    })
    def.parse(args);
  });
  it('should expand server argument (user+db+id+rev)', function(done){
    var mock = config.file('expand-username-server-database-id-rev.json');
    var args = qt.getArguments('info', {
      output: mock,
      clear: true,
      args: [
      'info',
      '-s',
      user + '/' + escaped + '/' + config.document.id + '?rev=' + config.rev,
      ]
    })
    var def = program(require(pkg), config.name);
    var errors = def.program.errors;
    def.program.on('complete', function(req) {
      expect(this.server).to.eql(server);
      expect(this.database).to.eql(database);
      expect(this.id).to.eql(config.document.id);
      expect(this.rev).to.eql(config.rev);
      expect(this.username).to.eql(config.user.name);
      done();
    })
    def.parse(args);
  });
})
