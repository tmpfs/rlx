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

module.exports = {
  init: init,
}
