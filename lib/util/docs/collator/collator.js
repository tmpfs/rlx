var Collator = function(options) {
  options = options || {};
  options.documents = options.documents || {};

  // strip file extensions from ids
  options.strip = options.strip === undefined ? true : options.strip;

  // inject automatic identifier
  options.auto = options.auto === undefined ? true : options.auto;
  this.options = options;
}

Collator.prototype.files = function(cb) {
  return cb.call(this, null, this.options.documents);
}

module.exports = Collator;
