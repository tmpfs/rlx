var parse = require('./parse');

function find(alias, aliases) {
  if(typeof alias === 'string') {
    alias = parse(alias);
  }
  alias = alias || {};
  aliases = aliases || {};
  var keys = Object.keys(aliases)
    , nm = alias.name
    , as, k, o = alias;
  if(!nm || !~keys.indexOf(nm)) {
    return null;
  }
  as = aliases[nm];
  for(k in as) {
    if(!o[k]) o[k] = as[k];
  }
  return o;
}

module.exports = find;
