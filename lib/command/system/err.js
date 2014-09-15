var pp = require('../../util/pp');

module.exports = function err(info, req, next) {
  var errors = this.configure().errors || []
    , log = this.log
    , raw = this.raw
    , scope = this
    , name = this.name();

  if(!raw) {
    return req.print(errors, req, next);
  }else{
    errors.forEach(function(err) {
      pp.conerr.call(scope, name, log, err);
    })
  }
  next();
}
