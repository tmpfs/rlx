var expect = require('chai').expect;

function set(doc, level) {
  expect(doc).to.be.an('object');
  expect(doc.level).to.be.a('string').to.eql(level);
  expect(doc.before).to.be.a('string');
}

function get(doc) {
  expect(doc).to.be.an('object');
  expect(doc.level).to.be.a('string');
}

module.exports = {
  get: get,
  set: set,
}
