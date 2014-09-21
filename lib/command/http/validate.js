var url = require('url')
  , re = require('../../util/re')
  , alias = require('../../util/alias')
  , loc = require('../../util/location');

module.exports = function validate(info, req, next) {
  if(!info.args.length) {
    return next(
      this.wrap(this.errors.ETOO_FEW_ARGUMENTS, [info.cmd.extra()]));
  }

  var uri = info.args[0]
    , raw = '' + uri
    , as
    , conf = this.configure()
    , aliases = conf.alias;

  if(aliases && alias.test(req, uri)) {
    as = alias.strip(req, uri);
    as = alias.find(as, aliases);
    if(as) {
      uri = raw = loc.stringify.call(this, as);
    }
  }

  uri = url.parse(uri);

  if(!uri.protocol || !re.protocol().test(uri.protocol)) {
    return next(
      this.wrap(this.errors.EINVALID_PROTOCOL, [raw]));
  }

  uri = raw;

  next(null, uri);
}
