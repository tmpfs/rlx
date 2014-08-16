var Couch = require('./util/couch')
  , CouchError = Couch.CouchError

module.exports = function boot(req, next) {
  req.db = function(options) {
    options = options || {server: this.server};
    return new Couch(options);
  }.bind(this);

  req.error = function(err, next) {
    var args = [].slice.call(arguments, 2);
    //console.dir(err);
    if(err instanceof CouchError) {
      var key = err.getErrorKey();
      //console.log('got couch error %s', key);
      if(this.errors[key]) {
        return next(this.errors[key], args);
      }else{
        return next(this.errors.EUNKNOWN_DB_ERROR, [err.doc]);
      }
    }else if(err.code) {
      return next(this.errors[err.code], args);
    }
    next(err);
  }.bind(this);

  next();
}
