module.exports = {
  collate: require('./collate'),
  find: require('./find'),
  list: require('./list'),
}
module.exports.collators = module.exports.collate.collators;
