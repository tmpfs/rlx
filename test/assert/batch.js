var expect = require('chai').expect;
var mock = require('../util/mock');
var server = require('./server');

function exec(doc) {
  expect(doc).to.be.an('array');
  expect(doc.length).to.eql(1);
  server.info(doc[0]);
}

function parse(doc) {
  expect(doc).to.be.an('array');
  expect(doc.length).to.eql(1);
  doc = doc[0];
  expect(doc).to.be.an('object')
  expect(doc.exec).to.be.an('array');
  expect(doc.options.server).to.eql(mock.server.default);

  //console.dir(doc.exec[0]);

  var exec = doc.exec[0], cmd;
  expect(exec).to.be.an('object');
  expect(exec.cmd).to.be.an('array');
  cmd = exec.cmd;
  expect(cmd).to.be.an('array');
  expect(cmd[0]).to.eql('info');
}

module.exports = {
  parse: parse,
  exec: exec,
}
