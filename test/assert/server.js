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

/**
 *  Assert on server statistics.
 */
function stats(doc) {
  var keys = Object.keys(doc);
  expect(doc).to.be.an('object');
  expect(keys).to.be.an('array');
  expect(keys.length).to.be.gt(0);
}

/**
 *  Assert on active tasks.
 */
function tasks(doc) {
  expect(doc).to.be.an('array').of.length(0);
}

function uuids(doc, count) {
  count = count === undefined ? 1 : count;
  expect(doc).to.be.an('object');
  expect(doc.uuids).to.be.an('array').of.length(count);
  expect(doc.uuids[0]).to.be.a('string');
}

module.exports = {
  info: info,
  stats: stats,
  tasks: tasks,
  uuids: uuids,
}
