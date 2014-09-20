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

function parseuser(doc, req) {
  expect(doc).to.be.an('object');
  expect(doc.name).to.eql(mock.alias.simple.name);
  expect(doc.username).to.eql(mock.user.name);
}

function userpass(doc, req) {
  parseuser(doc, req);
  expect(doc.password).to.eql(mock.user.password);
}


function parseuserdb(doc, req) {
  parseuser(doc, req);
  expect(doc.database).to.eql(mock.database.default);
}

function userdbdoc(doc, req) {
  parseuserdb(doc, req);
  expect(doc.id).to.eql(mock.document.id);
}

function userdbdocrev(doc, req) {
  userdbdoc(doc, req);
  expect(doc.rev).to.eql(mock.rev);
}

function get(doc, req) {
  expect(doc).to.be.an('object');
  expect(doc.name).to.eql(mock.alias.simple.name);
}


function print(doc, expected) {
  expect(doc).to.be.an('object');
  expect(doc).to.eql(expected);
}

function ls(doc) {
  expect(doc).to.be.an('object');
  expect(doc.lh).to.eql(mock.server.lh);
  expect(doc.lhs).to.eql(mock.server.lhs);
}

function lslong(doc) {
  expect(doc).to.be.an('object');
  expect(doc.lh).to.be.an('object');
  expect(doc.lhs).to.be.an('object');
  expect(doc.lh.server).to.eql(mock.server.lh);
  expect(doc.lhs.server).to.eql(mock.server.lhs);
}

function add(doc, req) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.file).to.eql(mock.usr.alias);
  expect(doc.alias).to.be.an('object');
  expect(doc.alias.name).to.eql(mock.alias.alt.name);
  expect(doc.alias.server).to.eql(mock.server.lh);
  expect(doc.alias.database).to.eql(mock.database.default);
  expect(doc.alias.id).to.eql(mock.document.id);
  expect(doc.alias.rev).to.eql(mock.rev);
}

function expand(cli) {
  expect(cli.server).to.eql(mock.server.lh);
}

module.exports = {
  init: init,
  parse: parse,
  parseuser: parseuser,
  parseuserdb: parseuserdb,
  userpass: userpass,
  userdbdoc: userdbdoc,
  userdbdocrev: userdbdocrev,
  get: get,
  print: print,
  ls: ls,
  lslong: lslong,
  add: add,
  rm: add,
  expand: expand,
}
