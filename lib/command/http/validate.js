var url = require('url');
var re = require('../../util/re');

module.exports = function validate(info, req, next) {

  if(!info.args.length) {
    return next(
      this.wrap(this.errors.ETOO_FEW_ARGUMENTS, [info.cmd.extra()]));
  }

  var uri = info.args[0]
    , raw = '' + uri;
  uri = url.parse(uri);

  if(!uri.protocol || !re.protocol().test(uri.protocol)) {
    return next(
      this.wrap(this.errors.EINVALID_PROTOCOL, [raw]));
  }

  uri = raw;

  next(null, uri);
}
