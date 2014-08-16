var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  before(function(done) {
    done();
  })
  it('should retrieve active tasks', function(done){
    var mock = config.file('server-tasks.json');
    var args = [
      'tasks', '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      expect(doc).to.be.an('array').of.length(0);
      done();
    })
    def.parse(args);
  });
})
