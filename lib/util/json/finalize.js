function finalize(results) {
  var long = this.long
    , flat = this.flat
    , map = {}
    , keys = []
    , collides = false
    , result
    , value;

  function toKeyObject(k, v, o) {
    o = o || {};
    o[k] = v;
    return o;
  }

  if(!long) {
    if(results.length === 1) {
      result = results[0];
      return result.value;
    }else{
      results = results.map(function(match) {
        collides = collides || ~keys.indexOf(match.key);
        keys.push(match.key);
        map[match.key] = match.value;
        return toKeyObject(match.key, match.value);
      })
    }
  }

  return !collides && !long ? map : results;
}

module.exports = finalize;
