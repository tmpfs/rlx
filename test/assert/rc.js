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
}

module.exports = {
  dir: dir,
  init: init,
}
