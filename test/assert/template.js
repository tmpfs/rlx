var expect = require('chai').expect;
var mock = require('../util/mock');

function text(doc) {
  expect(doc).to.be.a('string');
  expect(doc).match(/user/g);
  expect(doc).match(/new\.js/g);
}

function parse(doc) {
  expect(doc).to.be.an('object');
  expect(doc._id).to.be.a('string')
    .to.eql(mock.user.id);
  expect(doc.name).to.be.a('string')
    .to.eql(mock.user.name);
  expect(doc.password).to.be.a('string')
    .to.eql(mock.user.password);
  expect(doc.roles).to.be.an('array')
    .to.eql(mock.user.roles.split(','));
  expect(doc.type).to.be.a('string')
    .to.eql(mock.user.type);
}

module.exports = {
  text: text,
  parse: parse,
}
