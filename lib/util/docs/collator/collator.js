var match = require('../../match');

var Collator = function(options) {
  options = options || {};
  options.documents = options.documents || {};
  //this.keys = keys;
  //this.consume = options.consume !== undefined
    //? options.consume : true;

  //this.ignores = options.ignores || ['**/.*'];
  //this.index = options.index || {};
  //this.index.docs = ['index.json', 'index.js'];
  //this.system = ['index.json'];
  this.options = options;
}

Collator.prototype.files = function(cb) {
  return cb(null, this.options.documents);
}

module.exports = Collator;
