var expect = require('chai').expect;
var mock = require('../util/mock');
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
}

function info(doc, id) {
  id = id || mock.app.ddoc;
  expect(doc).to.be.an('object');
  expect(doc.name).to.eql(id);
  expect(doc.view_index).to.be.an('object');
}

function list(doc, id, len) {
  id = identity(id);
  len = len || 1;
  expect(doc).to.be.an('object');
  expect(doc.total_rows).to.be.a('number');
  expect(doc.offset).to.be.a('number');
  expect(doc.rows).to.be.an('array');
  expect(doc.rows.length).to.eql(len);
  var ddoc = doc.rows[0];
  expect(ddoc.id).to.eql(id);
  expect(ddoc.key).to.eql(id);
}

function view(doc, len, reduce) {
  len = len || 1;
  expect(doc).to.be.an('object');
  if(reduce === false) {
    expect(doc.total_rows).to.be.a('number');
    expect(doc.offset).to.be.a('number');
  }
  expect(doc.rows).to.be.an('array');
  expect(doc.rows.length).to.eql(len);
}

function nullupdate(doc) {
  expect(doc).to.be.an('object');
  expect(doc.error).to.eql('missing');
  expect(doc.reason).to.eql('no document to update');
}

function nullshow(doc) {
  expect(doc).to.be.an('object');
  expect(doc.error).to.eql('missing');
  expect(doc.reason).to.eql('no document to show');
}

function show(doc, id) {
  id = id || mock.app.shows.docid;
  expect(doc).to.be.an('object');
  expect(doc._id).to.eql(id);
  expect(doc.list).to.be.an('array');
}

function update(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
}

function updated(doc) {
  expect(doc).to.be.an('object');
  expect(doc.list).to.be.an('array');
  expect(doc.list.length).to.be.gt(0);
  for(var i = 0;i < doc.list.length;i++) {
    expect(doc.list[i].type).to.eql('item');
  }
}

function listfunc(doc, len, reduce) {
  len = len || 1;
  expect(doc).to.be.an('array');
  expect(doc.length).to.eql(len);
}


module.exports = {
  create: create,
  get: get,
  rm: create,
  head: head,
  info: info,
  list: list,
  view: view,
  nullupdate: nullupdate,
  nullshow: nullshow,
  show: show,
  update: update,
  updated: updated,
  listfunc: listfunc,
}
