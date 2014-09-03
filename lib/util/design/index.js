module.exports = {
  collate: require('./collate'),
  find: require('./find'),
  list: require('./list'),
  get: require('./get'),
  directory: require('./directory'),
  config: require('./collator/config'),
}
module.exports.collators = module.exports.collate.collators;
module.exports.index = module.exports.collate.collators;
