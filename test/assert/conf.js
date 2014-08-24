var expect = require('chai').expect;
var mock = require('../util/mock');

function all(doc) {
  var keys = Object.keys(doc);
  expect(doc).to.be.an('object');
  expect(keys).to.be.an('array');
  expect(keys.length).to.be.a('number').gt(0);
}

function set(doc) {
  expect(doc).to.be.a('string').to.eql("");
}

function section(doc) {
  expect(doc).to.be.an('object');
  expect(doc[mock.conf.key]).to.be.a('string')
    .to.eql(mock.conf.value);
}

function value(doc) {
  expect(doc).to.be.a('string')
    .to.eql(mock.conf.value);
}

function rm(doc) {
  expect(doc).to.be.a('string').to.eql(mock.conf.value);
}

module.exports = {
  all: all,
  set: set,
  section: section,
  value: value,
  rm: rm
}
