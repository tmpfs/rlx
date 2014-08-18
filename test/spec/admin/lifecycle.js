var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

var assert = {
  list: function(doc, len) {
    expect(doc).to.be.an('object');
    expect(doc.total_rows).to.be.a('number');
    expect(doc.offset).to.be.a('number');
    expect(doc.rows).to.be.an('array');
    if(len) {
      expect(doc.rows.length).to.be.gt(0);
    }
  },
  add: function(doc) {
    expect(doc).to.be.an('object');
    expect(doc.ok).to.eql(true);
    expect(doc.id).to.eql(config.user.id);
    expect(doc.rev).to.be.a('string');
  },
  get: function(doc) {
    expect(doc).to.be.an('object');
    expect(doc._id).to.eql(config.user.id);
    expect(doc._rev).to.be.a('string');
    expect(doc.name).to.eql(config.user.name);
    expect(doc.type).to.eql('user');
    expect(doc.roles).to.be.an('array').to.eql([]);
    expect(doc.password_scheme).to.be.a('string');
    expect(doc.derived_key).to.be.a('string');
    expect(doc.salt).to.be.a('string');
    expect(doc.iterations).to.be.a('number');
  }
}

assert.rm = assert.add;
assert.passwd = assert.add;

describe('rlx:', function() {
  this.timeout(5000);
  it('should list admins', function(done){
    var mock = config.file('admin-ls.json');
    var args = [
      'user',
      '--no-color',
      '-s', config.server.default,
      '-o', mock
    ];
    var def = program(require(pkg), config.name)
    def.program.on('complete', function(req) {
      var doc = config.json(mock);
      assert.list(doc);
      done();
    })
    def.parse(args);
  });
})
