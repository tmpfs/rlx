var re = {
  user: /^([^@]+)@(.*)/,
  auth: /^([^:]+):(.+)/,
  protocol: /^https?:\/\//,
}

function parse(alias) {
  alias = alias || '';
  alias = alias.replace(re.protocol, '');
  var o = {};
  if(re.user.test(alias)) {
    o.username = alias.replace(re.user, '$1');
    if(re.auth.test(o.username)) {
      o.password = o.username.replace(re.auth, '$2');
      o.username = alias.replace(re.auth, '$1');
      alias = alias.replace(re.user, '$2');
    }
  }
  o.alias = alias;
  return o;
}

module.exports = parse;
