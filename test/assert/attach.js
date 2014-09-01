var expect = require('chai').expect;
var mock = require('../util/mock');

function up(doc, id) {
  id = id || mock.document.id;
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.id).to.eql(id);
  expect(doc.rev).to.be.a('string');
  var revseq = parseInt(doc.rev.substr(0, 1))
  expect(revseq).to.be.gt(1);
}

function dl(doc, contents) {
  expect(doc).to.be.an('string');
  expect(doc).to.eql(contents);
}

function head(doc) {
  expect(doc).to.be.an('object');
  expect(doc.name).to.be.a('string');
  expect(doc.size).to.be.a('number');
  expect(doc.type).to.be.a('string');
  expect(doc.md5).to.be.a('string');
}

function get(doc) {
  expect(doc).to.be.an('object');
  expect(doc.revpos).to.be.a('number');
  expect(doc.length).to.be.a('number');
  expect(doc.stub).to.be.a('boolean');
  expect(doc.content_type).to.be.a('string');
  expect(doc.digest).to.be.a('string');
}

function list(doc, id) {
  expect(doc).to.be.an('object');
  var attachment = doc[id];
  get(attachment);
}

module.exports = {
  up: up,
  dl: dl,
  head: head,
  get: get,
  rm: up,
  list: list,
}
