var expect = require('chai').expect;

function head(doc) {
  expect(doc).to.be.an('object');
  expect(doc.size).to.be.a('number');
  expect(doc.rev).to.be.a('string');
}

module.exports = head;
