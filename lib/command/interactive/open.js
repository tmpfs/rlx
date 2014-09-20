var util = require('util')
  , cdb = require('cdb')
  , alias = require('../../util/alias')
  , exec = require('../../util/exec')
  , loc = require('../../util/location');

module.exports = function open(info, req, next) {
  var doc, url = info.args[0], cmd, flags, as, conf = this.configure();
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
  }else{
    if(alias.test(req, url)){
      as = alias.strip(req, url);
      doc = as = alias.find(as, this.configure().alias);
    }
  }

  if(doc && doc.server) {
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
    }else if(as) {
      url = loc.stringify.call(this, as);
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
