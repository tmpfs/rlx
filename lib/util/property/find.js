/**
 *  Accept a string dot delimited key and attempt to lookup the
 *  property on a target object.
 */
function find(key, target, options) {
  options = options || {};
  options.re = options.re || /\./;
  var parts = key.split(options.re);
  var o = target, i, k;
  for(i =0;i < parts.length;i++) {
    k = parts[i];
    o = o[k];
  }
  return {key: k, value: o};
}

module.exports = find;
