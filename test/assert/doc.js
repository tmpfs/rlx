var expect = require('chai').expect;
var mock = require('../util/mock');
var view = require('./view');
var parameters = require('cdb').parameters;

function create(doc, local) {
  var id = mock.document.id
  if(local) id = parameters.local + '/' + id;
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.id).to.eql(id);
  expect(doc.rev).to.be.a('string');
}

function get(doc, local) {
  var id = mock.document.id
  if(local) id = parameters.local + '/' + id;
  expect(doc).to.be.an('object');
  expect(doc._id).to.eql(id);
  for(var z in mock.document) {
    if(z === 'id') continue;
    expect(doc[z]).to.eql(mock.document[z]);
  }
}

function rev(doc) {
  expect(doc).to.be.an('object');
  expect(doc.rev).to.be.a('string');
  expect(doc.size).to.be.a('number');
}

function revs(doc) {
  expect(doc).to.be.an('object');
  expect(doc._revisions).to.be.an('object');
  expect(doc._revisions.start).to.be.a('number')
    .to.be.at.least(1);
  expect(doc._revisions.ids)
    .to.be.an('array').of.length.at.least(1);
}

function revsinfo(doc) {
  expect(doc).to.be.an('object');
  expect(doc._revs_info).to.be.an('array');
  expect(doc._revs_info.length).to.be.gt(0);
  var revision = doc._revs_info[0];
  expect(revision).to.be.an('object');
  expect(revision.rev).to.be.a('string');
  expect(revision.status).to.be.a('string');
}

module.exports = {
  create: create,
  get: get,
  rev: rev,
  revs: revs,
  revsinfo: revsinfo,
  rm: create,
  list: view.result,
}
