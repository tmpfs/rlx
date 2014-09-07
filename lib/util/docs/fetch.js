var get = require('./get');

function fetch(options, info, req, cb) {
  var scope = this;
  options = options || {};
  get.call(scope, options, info, req, function(err, doc) {
    if(err) return cb(err);
    cb(null, doc);
  })
}

module.exports = fetch;
