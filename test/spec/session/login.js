var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  before(function(done) {
    setup.admin.add(done);
  })
  after(function(done) {
    teardown.admin.rm(done);
  })

  it('should set session document (login)', function(done){
    var mock = config.file('login.json');
    var args = [
      'login',
      '-u',
      config.admin.name,
      '-p',
      config.admin.pass,
      '--no-color',
      '-s=' + config.server.default,
      '-o', mock,
      '--no-interactive'
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function() {
      var doc = config.json(mock);
      config.assert.security.ctx(doc);
      done();
    })
    def.parse(args);
  });
})
