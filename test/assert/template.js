var fs = require('fs');
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
  expect(doc.source).to.be.a('string');
  expect(doc.file).to.be.a('string');
  expect(fs.existsSync(doc.file)).to.eql(true);
  expect(fs.statSync(doc.file).isDirectory()).to.eql(true);
}

function initfile(doc, name) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.source).to.be.a('string');
  expect(doc.file).to.be.a('string')
    .to.eql(path.join(mock.paths.target, name || mock.template.file));
  expect(fs.existsSync(doc.file)).to.eql(true);
  expect(fs.statSync(doc.file).isFile()).to.eql(true);
}

function initapp(doc, name) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.source).to.be.a('string');
  expect(doc.file).to.be.a('string')
    .to.eql(path.join(mock.paths.target, name || mock.template.design));
  expect(fs.existsSync(doc.file)).to.eql(true);
  expect(fs.statSync(doc.file).isDirectory()).to.eql(true);
}

function dir(doc, req, list) {
  expect(doc).to.be.an('array');
  expect(doc.length).to.be.gt(0);
  if(!list) {
    list = [req.dirs.tpl.system, req.dirs.user.template]
  }
  expect(doc).to.eql(list);
}

module.exports = {
  text: text,
  parse: parse,
  initall: initall,
  initfile: initfile,
  initapp: initapp,
  dir: dir,
}
