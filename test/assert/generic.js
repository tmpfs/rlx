var expect = require('chai').expect;

function ok(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
}

function object(doc) {
  expect(doc).to.be.an('object');
}

function equal(doc, expected) {
  expect(doc).to.be.an('object').to.eql(expected);
}

function empty(doc) {
  equal(doc, {});
}

module.exports = {
  ok: ok,
  object: object,
  empty: empty,
  equal: equal,
}
