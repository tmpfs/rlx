var expect = require('chai').expect;

function bytes(doc, amount) {
  expect(doc).to.be.a('string').to.have.length.of.at.least(amount);
}

module.exports = {
  bytes: bytes,
}
