var util = require('util')
  , cdb = require('cdb')
  , exec = require('../../util/exec')
  , loc = require('../../util/location');

module.exports = function open(info, req, next) {
  var doc, url = info.args[0], cmd, flags;
  if(!info.args.length) {
    doc = loc.cwd.call(this);
    if(doc.server) {
      url = doc.url;
      flags = req.result.flags;
      if(flags.fu || flags.futon) {
        url = [doc.server, cdb.parameters.utils].join('/') + '/';
      }else if(flags.fa || flags.fauxton) {
        url = [
          doc.server,
          cdb.parameters.utils,
          cdb.parameters.fauxton
        ].join('/') + '/';
      }else if(flags.do || flags.docs) {
        url = [
          doc.server,
          cdb.parameters.utils,
          cdb.parameters.docs
        ].join('/') + '/';
      }
    }
  }

  if(!url) {
    return req.error(this.errors.EOPEN_URL, req, next);
  }

  cmd = util.format(req.rc.console.launch.url, url);

  exec.call(this, {cmd: cmd}, function(err, doc) {
    if(err) return req.error(err, req, next);
    next();
  })

}
