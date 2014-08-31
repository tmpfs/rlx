var expect = require('chai').expect;
var tasktypes = require('cdb').tasktypes;
var mock = require('../util/mock');

function empty(doc) {
  expect(doc).to.be.an('array').to.eql([]);
}

function add(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.session_id).to.be.a('string');
  expect(doc.source_last_seq).to.be.a('number');
  expect(doc.replication_id_version).to.be.a('number');
  expect(doc.history).to.be.an('array');
  expect(doc.history.length).to.be.gt(0);
}

function continuous(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc._local_id).to.be.a('string');
}

function list(doc) {
  expect(doc).to.be.an('array');
  expect(doc.length).to.be.gt(0);
  var replication = doc[0];

  expect(replication.pid).to.be.a('string');
  expect(replication.source).to.be.a('string')
    .to.eql(mock.repl.source);
  expect(replication.target).to.be.a('string')
    .to.eql(mock.repl.target);
  expect(replication.replication_id).to.be.a('string');
  expect(replication.type).to.be.a('string')
    .to.eql(tasktypes.replication);

  expect(replication.continuous).to.eql(true);

  expect(replication.checkpoint_interval).to.be.a('number');
  expect(replication.checkpointed_source_seq).to.be.a('number');
  expect(replication.doc_write_failures).to.be.a('number');
  expect(replication.docs_read).to.be.a('number');
  expect(replication.docs_written).to.be.a('number');
  expect(replication.missing_revisions_found).to.be.a('number');
  expect(replication.progress).to.be.a('number');
  expect(replication.revisions_checked).to.be.a('number');
  expect(replication.source_seq).to.be.a('number');
  expect(replication.updated_on).to.be.a('number');
}

module.exports = {
  empty: empty,
  add: add,
  continuous: continuous,
  rm: continuous,
  list: list,
}
