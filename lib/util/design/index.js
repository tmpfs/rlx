var prefix = 'design/' ;

function matches(name) {
  return name.indexOf(prefix) === 0;
}

function strip(name) {
  return name.replace(/^design\//, '');
}

function prepend(name) {
  if(matches(name)) return name;
  return prefix + name.replace(/^\/+/, '');
}

module.exports = {
  matches: matches,
  strip: strip,
  prepend: prepend,
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
