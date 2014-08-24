var expect = require('chai').expect;

function ok(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
}

function object(doc) {
  expect(doc).to.be.an('object');
}

function empty(doc) {
  expect(doc).to.be.an('object').to.eql({});
}

module.exports = {
  ok: ok,
  object: object,
  empty: empty,
}
