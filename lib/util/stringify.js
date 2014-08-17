var circular = require('circular');

function stringify(doc, indent) {
  return JSON.stringify(doc, circular(), indent || 2);
}

module.exports = stringify;
