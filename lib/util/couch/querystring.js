var encode= ['key', 'keys', 'startkey', 'endkey'];

function stringify(qs) {
  var o = {};
  for(var z in qs) {
    o[z] = qs[z];
    if(~encode.indexOf(z)) {
      o[z] = JSON.stringify(o[z]);
    }
  }
  return o;
}

module.exports.stringify = stringify;
