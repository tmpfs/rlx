var circular = require('circular');

function stringify(doc, indent) {
  return JSON.stringify(doc, circular(null, true),
    typeof indent === 'number' ? indent : 2);
}

module.exports = stringify;
