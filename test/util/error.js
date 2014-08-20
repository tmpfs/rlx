var expect = require('chai').expect;

function err(key) {
  expect(key).to.be.a('string');
  return function onError(err, errors) {
    var def = errors[key];
    expect(def).to.be.an('object');
    expect(err).to.be.instanceof(Error);
    expect(err.key).to.eql(def.key);
  }
}

module.exports = err;
