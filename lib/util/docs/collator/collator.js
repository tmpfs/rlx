var Collator = function(options) {
  options = options || {};
  options.documents = options.documents || {};

  // strip file extensions from ids
  options.strip = options.strip === undefined ? true : options.strip;

  // inject automatic identifier
  options.auto = options.auto === undefined ? true : options.auto;

  this.ignores = options.ignores;
  this.system = null;
  this.options = options;
  this.includes = ['**/*.json', '**/*.js'];
}

Collator.prototype.files = function(cb) {
  return cb.call(this, null, this.options.documents);
}

module.exports = Collator;
