var circular = require('circular');

function stringify(doc, indent) {
  //console.dir(JSON.stringify(doc, circular, 2));
  return JSON.stringify(doc, circular(), indent || 2);
}

module.exports = stringify;
