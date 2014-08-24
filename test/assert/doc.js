var expect = require('chai').expect;
var mock = require('../util/mock');

function create(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.id).to.eql(mock.document.id);
  expect(doc.rev).to.be.a('string');
}

module.exports = {
  create: create,
}
