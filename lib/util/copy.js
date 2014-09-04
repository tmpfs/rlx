var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var ncp = require('ncp');

function filter(file) {
  var re = /(\.gitignore|\.npmignore)$/;
  return !re.test(file);
}

function copy(info, req, next, options) {
  var scope = this, log = this.log, force = this.force, errors = this.errors;
  var source = options.source, destination = options.destination;
  options.ncp = options.ncp || {};
  options.ncp.filter = options.ncp.filter || filter;
  log.debug('%s => %s', source, destination);
  fs.exists(destination, function(exists) {
    if(exists && !force) {
      return req.error(scope.wrap(errors.EFS_FILE_EXISTS,
        [destination, scope.options().force.toString(null)]),
        req, next);
    }
    mkdirp(path.dirname(destination), function(err) {
      if(err) return req.error(err, req, next);
      if(options.rename) {
        destination = path.join(path.dirname(destination), options.rename);
      }
      ncp(source, destination, options.ncp, function(errs) {
        if(errs) return req.error(errs[0], req, next);
        var doc = {
          ok: true,
          file: destination,
          source: source
        }
        req.print(doc, req, next);
      });
    });
  });
}

module.exports = copy;
module.exports.filter = filter;
