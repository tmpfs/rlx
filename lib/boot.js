var Couch = require('./util/couch')
  , CouchError = Couch.CouchError

var MAX_DB_CALL_STACK = 32;

function getErrorArguments(key, req, args) {
  var last = req.db.calls[req.db.calls.length -1];
  if(last) {
    switch(key) {
      case 'EMETHOD_NOT_ALLOWED':
        args = [last.err.res.req.method];
        break;
    }
  }
  return args;
}

module.exports = function boot(req, next) {
  req.db = function(options) {
    options = options || {server: this.server};
    return new Couch(options);
  }.bind(this);

  req.db.add = function(req, err, res, opts, doc) {
    var calls = req.db.calls = req.db.calls || [];
    calls.push({err: err, res: res, opts: opts, doc: doc});
    if(calls.length > MAX_DB_CALL_STACK) calls.shift();
  }.bind(this);

  req.error = function(err, next) {
    var args = [].slice.call(arguments, 2);
    //console.dir(err);
    if(err instanceof CouchError) {
      var key = err.getErrorKey();
      //console.log('got couch error %s', key);
      if(this.errors[key]) {
        args = getErrorArguments(key, req, args);
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
