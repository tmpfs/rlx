var template = require('../../util/template');

module.exports = function ls(info, req, next) {
  var scope = this, log = this.log;
  var verbose = this.verbose === true;
  template.list.call(this, req, function(err, list, unique) {
    if(err) return next(err);
    var z, item;
    for(z in unique) {
      item = unique[z];
      if(!item.override) {
        console.log('%s', verbose ? item.file : z);
      }else{
        console.log(
          '%s (overrides %s)', verbose ? item.file : z, item.override.file);
      }
    }
    next();
  })
}
