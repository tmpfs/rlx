var expect = require('chai').expect;

function headers(req) {
  expect(req.headers).to.be.an('object');
  expect(req.headers['x-couch-full-commit'])
    .to.be.a('string').eql('true');
  expect(req.headers['if-none-match'])
    .to.be.a('string').eql('"revision"');
}

module.exports = {
  headers: headers,
}
