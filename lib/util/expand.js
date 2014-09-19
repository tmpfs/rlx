var url = require('url');

/**
 *  Expand server argument to:
 *
 *  host (server)
 *  database
 *  id (document)
 *  rev
 *  ddoc
 *  username
 */
function expand(req, cb) {
  var scope = this
    , errors = this.errors
    , o = {}
    , opts = req.result.options
    , re = {
      protocols: /^https?:$/
    }
  var vars = {
    server: opts.server,
    database: opts.database,
    id: opts.id,
    rev: opts.rev,
    ddoc: opts.ddoc,
    username: opts.username,
  }

  if(vars.server) {
    console.log('expand server argument %s', vars.server);
    var u = url.parse(vars.server, true, true);
    if(!u.protocol || !re.protocols.test(u.protocol)) {
      return cb.call(scope, scope.wrap(errors.EINVALID_PROTOCOL, [vars.server]));
    }
  }

  cb.call(scope, null, o);
}

module.exports = expand;
