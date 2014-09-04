var path = require('path');
var expect = require('chai').expect;
var mock = require('../util/mock');

function text(doc) {
  expect(doc).to.be.a('string');
  expect(doc).match(/user/g);
  expect(doc).match(/new\.js/g);
}

function parse(doc) {
  expect(doc).to.be.an('object');
  expect(doc._id).to.be.a('string')
    .to.eql(mock.user.id);
  expect(doc.name).to.be.a('string')
    .to.eql(mock.user.name);
  expect(doc.password).to.be.a('string')
    .to.eql(mock.user.password);
  expect(doc.roles).to.be.an('array')
    .to.eql(mock.user.roles.split(','));
  expect(doc.type).to.be.a('string')
    .to.eql(mock.user.type);
}

function initall(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.file).to.be.a('string');
}

function initfile(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.file).to.be.a('string')
    .to.eql(path.join(mock.paths.target, mock.template.file));
}

function initapp(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.file).to.be.a('string')
    .to.eql(path.join(mock.paths.target, path.basename(mock.template.design)));
}

module.exports = {
  text: text,
  parse: parse,
  initall: initall,
  initfile: initfile,
  initapp: initapp,
}
