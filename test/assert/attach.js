var expect = require('chai').expect;
var mock = require('../util/mock');

function up(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.id).to.eql(mock.document.id);
  expect(doc.rev).to.be.a('string');
  var revseq = parseInt(doc.rev.substr(0, 1))
  expect(revseq).to.be.gt(1);
}

module.exports = {
  up: up,
}
