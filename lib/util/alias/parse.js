var re = {
  user: /^([^@]+)@(.*)/,
  auth: /^([^:]+):(.+)/,
  protocol: /^https?:\/\//,
}

function parse(alias) {
  alias = alias || '';
  alias = alias.replace(re.protocol, '');
  var o = {}, parts;
  if(re.user.test(alias)) {
    o.username = alias.replace(re.user, '$1');
    if(re.auth.test(o.username)) {
      o.password = o.username.replace(re.auth, '$2');
      o.username = alias.replace(re.auth, '$1');
    }
    alias = alias.replace(re.user, '$2');
  }
  if(~alias.indexOf('/')) {
    alias = alias.replace(/^\/+/, '').replace(/\/+$/, '');
    parts = alias.split('/');
    alias = parts[0];
    if(parts[1]) o.database = parts[1];
    if(parts[2]) o.id = parts[2];
    if(parts[3]) o.rev = parts[3];
  }
  o.name = alias;
  return o;
}

module.exports = parse;
