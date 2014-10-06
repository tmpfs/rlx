var expect = require('chai').expect;
var mock = require('../util/mock');

function list(doc, len) {
  expect(doc).to.be.an('object');
  expect(doc.total_rows).to.be.a('number');
  expect(doc.offset).to.be.a('number');
  expect(doc.rows).to.be.an('array');
  if(len) {
    expect(doc.rows.length).to.be.gt(0);
  }
}

function add(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.id).to.eql(mock.user.id);
  expect(doc.rev).to.be.a('string');
}

function get(doc) {
  expect(doc).to.be.an('object');
  expect(doc._id).to.eql(mock.user.id);
  expect(doc._rev).to.be.a('string');
  expect(doc.name).to.eql(mock.user.name);
  expect(doc.type).to.eql('user');
  expect(doc.roles).to.be.an('array').to.eql(['user']);
  expect(doc.password_scheme).to.be.a('string');
  expect(doc.derived_key).to.be.a('string');
  expect(doc.salt).to.be.a('string');
  expect(doc.iterations).to.be.a('number');
}

function edit(doc, id) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.id).to.eql(id);
  expect(doc.rev).to.be.a('string');
}

module.exports = {
  list: list,
  add: add,
  get: get,
  edit: edit,
  rm: add,
  passwd: add
}
