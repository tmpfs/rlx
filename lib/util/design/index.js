function matches(name) {
  return name.indexOf('design/') === 0;
}

function strip(name) {
  return name.replace(/^design\//, '');
}

module.exports = {
  matches: matches,
  strip: strip,
  collate: require('./collate'),
  find: require('./find'),
  list: require('./list'),
  get: require('./get'),
  directory: require('./directory'),
  config: require('./collator/config'),
  glob: {
    wildcard: '/**',
    javascript: '*.js'
  }
}
module.exports.collators = module.exports.collate.collators;
module.exports.index = module.exports.collate.collators;
