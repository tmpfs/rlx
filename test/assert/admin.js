var expect = require('chai').expect;

function assert(doc, name, len, gt) {
  expect(doc).to.be.an('object');
  var keys = Object.keys(doc);
  expect(keys).to.be.an('array');
  if(!len || gt) {
    expect(keys.length).to.be.gt(gt ? len : 0);
  }else{
    expect(keys.length).to.eql(len);
  }
  if(name) {
    expect(!!~keys.indexOf(name)).to.eql(true);
  }
}

module.exports = assert;
