var expect = require('chai').expect;

/**
 *  Assert on server meta data.
 */
function info(doc) {
  expect(doc).to.be.an('object');
  expect(doc.couchdb).to.be.a('string');
  expect(doc.uuid).to.be.a('string');
  expect(doc.version).to.be.a('string');
  expect(doc.vendor).to.be.an('object');
  expect(doc.vendor.version).to.be.a('string');
  expect(doc.vendor.name).to.be.a('string');
}

module.exports = {
  info: info,
}
