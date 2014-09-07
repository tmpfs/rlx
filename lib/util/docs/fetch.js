var get = require('./get');
var deconstruct = require('./deconstruct');

function fetch(options, info, req, cb) {
  var scope = this;
  options = options || {};
  get.call(scope, options, info, req, function(err, doc) {
    if(err) return cb(err);
    options.docs = doc.docs;
    deconstruct.call(scope, options, info, req, function(err, doc) {
      if(err) return cb(err);
      cb(null, doc);
    });
  })
}

module.exports = fetch;
