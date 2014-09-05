/**
 *  Accept a string dot delimited key and attempt to lookup the
 *  property on a target object.
 */
function find(key, target, options) {
  options = options || {};
  options.re = options.re || /\./;
  var parts = key.split(options.re), path = [];
  var o = target, i, k;
  for(i =0;i < parts.length;i++) {
    k = parts[i];
    p = o;
    o = o[k];
    if(!o) break;
    path.push(k);
  }
  return {key: k, value: o, parent: p, path: path.join('.')};
}

module.exports = find;
