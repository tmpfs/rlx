var path = require('path');
var collators = require('./collator');

function collate(options, req, cb) {
  options = options || {};
  options.lang = options.lang || 'javascript';
  var clazz = collators[options.lang];
  if(!clazz) {
    return cb.call(this,
      this.wrap('unsupported document collation language %s', [lang]));
  }

  var collator = new clazz(options);
  collator.collate(this, cb);
}

module.exports = collate;
module.exports.collators = collators;
