var Couch = require('./util/couch');

module.exports = function boot(req, next) {
  req.db = function(options) {
    options = options || {server: this.server};
    return new Couch(options);
  }.bind(this);

  req.error = function(err, next) {
    var args = [].slice.call(arguments, 2);
    if(err.code) {
      return next(this.errors[err.code], args);
    }
    next(err);
  }.bind(this);

  next();
}
