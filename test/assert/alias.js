var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var mock = require('../util/mock');

function init(doc, req) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.source).to.eql(req.files.alias);
  expect(doc.file).to.eql(mock.usr.alias);
  expect(fs.statSync(doc.file).isFile()).to.eql(true);
}

function parse(doc, req) {
  expect(doc).to.be.an('object');
  expect(doc.name).to.eql(mock.alias.simple.name);
}

function get(doc, req) {
  expect(doc).to.be.an('object');
  expect(doc.name).to.eql(mock.alias.simple.name);
}

module.exports = {
  init: init,
  parse: parse,
  get: get,
}
