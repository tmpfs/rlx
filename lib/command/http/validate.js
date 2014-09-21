var url = require('url');
var re = require('../../util/re');

module.exports = function validate(info, req, next) {
  if(!info.args.length) {
    return req.error(
      this.errors.ETOO_FEW_ARGUMENTS, req, next, [info.cmd.extra()]);
  }

  var uri = info.args[0]
    , raw = '' + uri;
  uri = url.parse(uri);

  if(!uri.protocol || !re.protocol().test(uri.protocol)) {
    return req.error(this.errors.EINVALID_PROTOCOL, req, next, [raw]);
  }

  uri = raw;

  next(uri);
}
