var prompt = require('cli-input');
module.exports = function interactive(info, req, next) {
  var scope = this
    , opts = {infinite: true, split: /\s+/}
    , ps = prompt(opts);
  this.configure().exit = false;
  ps.on('value', function(val) {
    if(!val) return;
    if(~val.indexOf('i') || ~val.indexOf('interactive')) return;

    // need to clear previously stashed data
    for(var z in scope) {
      delete scope[z];
    }
    scope.parse(val, function(err, req, parameters, e) {
      parameters = parameters || [];
      if(err) {
        return req.error(err, req, function(err, args) {
          scope.raise(err, args);
        }, parameters);
      }
    });
  })
  ps.run([]);
}
