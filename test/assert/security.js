var expect = require('chai').expect;

function ctx(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
  expect(doc.userCtx).to.be.an('object');
  expect(doc.info).to.be.an('object');
}

function edit(doc) {
  expect(doc).to.be.an('object');
  expect(doc.ok).to.eql(true);
}

module.exports = {
  ctx: ctx,
  edit: edit,
}
