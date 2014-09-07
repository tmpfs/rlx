var expect = require('chai').expect;
var mock = require('../util/mock');

function push(doc) {
  expect(doc).to.be.an('array');
  expect(doc.length).to.be.gt(0);
  for(var i = 0;i < doc.length;i++) {
    expect(doc[i].ok).to.eql(true);
  }
}

function list(doc) {
  expect(doc).to.be.an('object');
  var keys = Object.keys(doc), k, v;
  expect(keys.length).to.be.gt(0);
  for(k in doc) {
    v = doc[k];
    listitem(v, false);
  }
}

function listitem(doc, ll) {
  expect(doc).to.be.an('object');
  expect(doc.file).to.be.a('string');
  expect(doc.name).to.be.a('string');
  expect(doc.path).to.be.a('string');
  if(ll) {
    expect(doc.id).to.be.a('string');
    expect(doc.key).to.be.a('string');
    expect(doc.document).to.be.an('object');
  }
}

function listlong(doc) {
  expect(doc).to.be.an('object');
  var keys = Object.keys(doc), k, v;
  expect(keys.length).to.be.gt(0);
  for(k in doc) {
    v = doc[k];
    listitem(v, true);
  }
}

function revs(doc, ids) {
  ids = ids || mock.docs.ids;
  expect(doc).to.be.an('object');
  expect(Object.keys(doc)).to.eql(ids);
  for(var k in doc) {
    expect(doc[k]).to.be.a('string');
  }
}

function revsraw(doc, ids) {
  ids = ids || mock.docs.ids;
  expect(doc).to.be.an('object');
  expect(doc.rows).to.be.an('array');
  expect(doc.rows.length).to.eql(ids.length);
  var keys = doc.rows.map(function(doc) {
    if(doc.id) {
      return doc.id;
    }
  })
  expect(keys).to.eql(ids);
}

function revslong(doc, ids) {
  ids = ids || mock.docs.ids;
  expect(doc).to.be.an('array');
  expect(doc.length).to.eql(ids.length);
  var keys = doc.map(function(doc) {
    if(doc.id) {
      return doc.id;
    }
  })
  expect(keys).to.eql(ids);
}

function revserror(doc, ids) {
  ids = ids || mock.docs.ids;
  expect(doc).to.be.an('object');
  expect(doc[mock.docs.unknown]).to.be.an('object')
    .to.have.property('error').to.eql('not_found');
  delete doc[mock.docs.unknown]
  revs(doc, ids);
}

function rm(doc, ids) {
  ids = ids || mock.docs.ids;
  expect(doc).to.be.an('array');
  expect(doc.length).to.eql(ids.length);
  var keys = doc.map(function(doc) {
    expect(doc.ok).to.eql(true);
    expect(doc.rev).to.be.a('string');
    if(doc.id) {
      return doc.id;
    }
  })
  expect(keys).to.eql(ids);
}

function rmerror(doc, id) {
  id = id || mock.docs.unknown;
  expect(doc).to.be.an('array');
  var err = doc[0];
  expect(err).to.be.an('object')
    .to.have.property('error')
    .to.eql('not_found');
}

function rmerrorlenient(doc) {
  expect(doc).to.be.an('array')
    .to.eql([]);
}

module.exports = {
  push: push,
  list: list,
  listlong: listlong,
  revs: revs,
  revsraw: revsraw,
  revslong: revslong,
  revserror: revserror,
  rm: rm,
  rmerror: rmerror,
  rmerrorlenient: rmerrorlenient,
}
