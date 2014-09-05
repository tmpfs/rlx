var expect = require('chai').expect;
var mock = require('../util/mock');

function push(doc) {
  expect(doc).to.be.an('array');
  expect(doc.length).to.be.gt(0);
  for(var i = 0;i < doc.length;i++) {
    expect(doc[i].ok).to.eql(true);
  }
}

module.exports = {
  push: push,
}
