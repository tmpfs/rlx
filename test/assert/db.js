var expect = require('chai').expect;
var mock = require('../util/mock');
var generic = require('./generic');

function list(doc, len, walk) {
  expect(doc).to.be.an('array');
  expect(doc.length).to.be.gt(0);
  if(typeof walk === 'function') {
    for(var i = 0;i < doc.length;i++) {
      walk(doc[i]);
    }
  }
}

function bulkitem(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.id).to.be.a('string');
  expect(doc.rev).to.be.a('string');
}

function bulk(doc, len) {
  list(doc, len, bulkitem);
}

function info(doc, name) {
  expect(doc).to.be.an('object');
  expect(doc.db_name).to.eql(name);
}

function changes(doc) {
  expect(doc.results).to.be.an('array');
  expect(doc.last_seq).to.be.a('number');
}

function commit(doc) {
  expect(doc).to.be.an('object');
  // NOTE: this is a string, but really couch should return a number
  expect(doc.instance_start_time).to.be.a('string');
}

function getlimit(doc) {
  expect(doc).to.be.a('number');
}

module.exports = {
  list: list,
  bulk: bulk,
  info: info,
  changes: changes,
  commit: commit,
  getlimit: getlimit,
  setlimit: generic.ok,
  add: generic.ok,
  rm: generic.ok,
  exists: generic.ok,
  compact: generic.ok,
  cleanup: generic.ok,
}
