var expect = require('chai').expect;

function ok(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
}

module.exports = {
  ok: ok
}
