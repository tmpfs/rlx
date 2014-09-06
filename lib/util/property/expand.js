function expand(source, options) {
  options = options || {};
  var delimiter = options.delimiter = options.delimiter || '.';
  var o = {}, k, v, parts, i, p;
  for(k in source) {
    v = source[k];
    if(!~k.indexOf(delimiter)) {
      o[k] = v;
    }else{
      parts = k.split(delimiter);
      p = o;
      for(i = 0;i < parts.length;i++) {
        k = parts[i];
        if(i < parts.length - 1) {
          p[k] = p[k] || {};
          p = p[k];
        }else{
          p[k] = v;
        }
      }
    }
  }
  return o;
}

module.exports = expand;
