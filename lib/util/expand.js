var url = require('url')
  , querystring = require('querystring')
  , cdb = require('cdb')
  , alias = require('./alias')
  , key = 'server';

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
    , o = {}, un, pw, db, id
    , opts = req.result.options
    , re = {
      protocols: /^https?:$/,
      auth: /^([^:]+):(.*)$/,
      reserved: /^_/
    }
    , u, pth, parts;

  var vars = {
    server: opts.server,
    database: opts.database,
    id: opts.id,
    rev: opts.rev,
    ddoc: opts.ddoc,
    username: opts.username,
    password: opts.password
  }

  if(vars.server) {
    if(alias.test.call(scope, req, vars.server)) {
      return cb.call(scope, null, o);
    }

    //console.log('expand server argument %s', vars.server);

    u = url.parse(vars.server, true, true);
    if(!u.protocol || !re.protocols.test(u.protocol)) {
      return cb.call(scope, scope.wrap(errors.EINVALID_PROTOCOL, [vars.server]));
    }

    o.server = u.protocol + '//' + u.host;

    if(u.auth) {
      un = u.auth.replace(re.auth, '$1');
      pw = u.auth.replace(re.auth, '$2');
      if(un) o.username = un;
      if(pw) o.password = pw;
    }

    pth = u.pathname.replace(/^\/+/, '');
    parts = pth.split('/').map(function(p) {
      return p;
    })

    if(parts.length) {
      db = querystring.unescape(parts.shift());
    }

    if(db && (cdb.util.db.valid.reserved(db) || !re.reserved.test(db))) {
      o.database = db;

    // likely a top-level API call, _tasks etc.
    // could infer command here
    }else if(re.reserved.test(db)) {
      // TODO
    }

    // could check for reserved depth-based ids like _design here
    parts.forEach(function(p) {
      // TODO
    })

    if(parts.length) id = parts.join('/');

    if(id) o.id = id;

    if(u.query && u.query.rev) {
      o.rev = u.query.rev;
    }
  }

  //console.dir(o);

  cb.call(scope, null, o);
}

function assign(expansions, target) {
  target = target || this;
  for(var k in expansions) {
    // don't overwite parsed arguments
    // already assigned when expanding
    if(k === key || !target[k]) {
      target[k] = expansions[k];
    }
  }
}

expand.assign = assign;

module.exports = expand;
