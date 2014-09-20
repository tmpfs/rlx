var re = {
  user: /^([^@]+)@(.*)/,
  auth: /^([^:]+):(.+)/,
  protocol: /^https?:\/\//,
}

var url = require('url')
  , querystring = require('querystring');

function parse(alias) {
  alias = alias || '';
  alias = alias.replace(re.protocol, '');
  var o = {}, parts, u;
  if(re.user.test(alias)) {
    o.username = alias.replace(re.user, '$1');
    if(re.auth.test(o.username)) {
      o.password = o.username.replace(re.auth, '$2');
      o.username = alias.replace(re.auth, '$1');
    }
    alias = alias.replace(re.user, '$2');
  }
  function strip(s) {
    return s.replace(/^\/+/, '').replace(/\/+$/, '');
  }
  if(~alias.indexOf('/') || ~alias.indexOf('?')) {
    alias = strip(alias);
    u = url.parse(alias, true, true);
    parts = strip(u.pathname).split('/');

    //console.dir(u);
    //console.dir(parts);

    alias = parts.shift();
    if(parts.length) o.database = querystring.unescape(parts.shift());
    if(parts.length) o.id = parts.join('/');
    if(u.query && u.query.rev) o.rev = u.query.rev;
  }
  o.name = alias;
  //console.dir(o);
  return o;
}

module.exports = parse;
