var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

describe('rlx:', function() {
  this.timeout(5000);
  it('should parse template file', function(done){
    var mock = config.file('template-parse.json');
    var args = [
      'tpl',
      'parse',
      '-t',
      'user/new',
      '@id=' + config.user.id,
      '@name=' + config.user.name,
      '@password=' + config.user.pass,
      '@roles=' + config.user.roles,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      expect(doc).to.be.an('object');

      expect(doc._id).to.be.a('string')
        .to.eql(config.user.id);
      expect(doc.name).to.be.a('string')
        .to.eql(config.user.name);
      expect(doc.password).to.be.a('string')
        .to.eql(config.user.pass);
      expect(doc.roles).to.be.an('array')
        .to.eql(config.user.roles.split(','));
      expect(doc.type).to.be.a('string')
        .to.eql(config.user.type);
      done();
    })
    def.parse(args);
  });
})
