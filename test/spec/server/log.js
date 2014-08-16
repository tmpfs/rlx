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
  it('should retrieve log data', function(done){
    var mock = config.file('server-log.txt');
    var args = [
      'log', '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.text(mock);
      console.dir(doc);
      //expect(doc).to.be.an('string');
      done();
    })
    def.parse(args);
  });
})
