var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;

var user = {
  id: 'org.couchdb.user:mock-user',
  name: 'Mock User',
  password: 'secret',
  roles: 'admin,user',
  type: 'user'
}

describe('rlx:', function() {
  this.timeout(5000);
  it('should parse template file', function(done){
    var mock = config.file('template-parse.json');
    var args = [
      'tpl',
      'parse',
      '-t',
      'user/new',
      '@id=' + user.id,
      '@name=' + user.name,
      '@password=' + user.password,
      '@roles=' + user.roles,
      '--no-color',
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      //console.dir(doc);
      expect(doc).to.be.an('object');

      expect(doc._id).to.be.a('string')
        .to.eql(user.id);
      expect(doc.name).to.be.a('string')
        .to.eql(user.name);
      expect(doc.password).to.be.a('string')
        .to.eql(user.password);
      expect(doc.roles).to.be.an('array')
        .to.eql(user.roles.split(','));
      expect(doc.type).to.be.a('string')
        .to.eql(user.type);
      done();
    })
    def.parse(args);
  });
})
