function finalize(results) {
  var long = this.long
    , flat = this.flat
    , map = {};

  function toKeyObject(k, v, o) {
    o = o || {};
    o[k] = v;
    return o;
  }

  if(!long) {
    results = results.map(function(match) {
      if(flat) {
        map[match.key] = match.value;
      }
      return toKeyObject(match.key, match.value);
    })
  }

  return flat ? map : results;
}

module.exports = finalize;
