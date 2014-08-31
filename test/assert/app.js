var expect = require('chai').expect;
var mock = require('../util/mock');
var view = require('./view');
var parameters = require('cdb').parameters;
var head = require('./head');

function identity(id) {
  id = id || mock.app.ddoc;
  return parameters.design + '/' + id;
}

function create(doc, id) {
  id = identity(id);
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.id).to.eql(id);
  expect(doc.rev).to.be.a('string');
}

function get(doc, id) {
  id = identity(id);
  expect(doc).to.be.an('object');
  expect(doc._id).to.eql(id);
  expect(doc._rev).to.be.a('string');
  expect(doc.language).to.be.a('string');
  expect(doc.validate_doc_update).to.be.a('string');
  expect(doc.options).to.be.an('object');
  expect(doc.views).to.be.an('object');
  expect(doc.lib).to.be.an('object');
  expect(doc.updates).to.be.an('object');
  expect(doc.shows).to.be.an('object');
  expect(doc.lists).to.be.an('object');
  expect(doc.filters).to.be.an('object');
  expect(doc.module).to.be.a('string');
  //console.dir(doc);
}

module.exports = {
  create: create,
  get: get,
  rm: create,
  head: head,
}
