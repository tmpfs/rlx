var circular = require('circular');

function stringify(doc, replacer, indent) {
  return JSON.stringify(doc, replacer ? replacer : circular(null, true),
    typeof indent === 'number' ? indent : 2);
}

module.exports = stringify;
