var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;
var mock = require('../util/mock');

function dir(doc, req, list) {
  expect(doc).to.be.an('array');
  expect(doc.length).to.be.gt(0);
  if(!list) {
    list = [req.dirs.base, req.dirs.user.home]
  }
  expect(doc).to.eql(list);
}

function init(doc, req) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.source).to.eql(path.join(req.dirs.base, req.runcontrol.name));
  expect(doc.file).to.eql(path.join(req.dirs.user.home, req.runcontrol.name));
  expect(fs.statSync(doc.file).isFile()).to.eql(true);
}

function ls(doc, req, list) {
  expect(doc).to.be.an('array');
  if(!list) {
    list = [
      path.join(req.dirs.base, req.runcontrol.name),
      path.join(req.dirs.user.home, req.runcontrol.name)];
  }
  expect(doc).to.eql(list);
}

function lslong(doc, req, list) {
  expect(doc).to.be.an('object');
  var keys = Object.keys(doc);
  ls(keys, req, list);
  for(var i = 0;i < keys.length;i++) {
    expect(doc[keys[i]]).to.be.an('object');
  }
}

function print(doc, req) {
  expect(doc).to.be.an('object');
  expect(doc.indent).to.be.a('number');
  expect(doc.server).to.eql(null);
  expect(doc.edit).to.be.an('object')
  expect(doc.restart).to.be.an('object')
  expect(doc.highlight).to.be.an('object')
  expect(doc.progress).to.be.an('object')
  expect(doc.search).to.be.an('object')
}

module.exports = {
  dir: dir,
  init: init,
  ls: ls,
  lslong: lslong,
  print: print,
}
