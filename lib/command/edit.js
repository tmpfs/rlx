var fs = require('fs');
var editor = require('../util/editor');
var temp = require('../util/temp');
var write = require('../util/write');
var stringify = require('../util/stringify');
var types = require('../util/types');

module.exports = function edit(info, req, next) {
  var scope = this, log = this.log;
  var file = null;
  // should we use a temp local file
  var tmp = false;
  var output = this.output;
  var body = null;

  if(!req.document.body) {
    return req.error(this.errors.EDOCUMENT_REQUIRED, req, next);
  }

  file = req.document.source;
  tmp = req.document.remote || req.document.literal;

  if(tmp) {
    tmp = temp.filepath(req);
  }

  if(tmp) {
    if(req.document.type === types.json) {
      body = stringify(req.document.body, null, req.rc.indent || 2);
    }else{
      body = '' + req.document.body;
    }
  }

  var opts = {
    file: tmp || file,
    hash: req.rc.edit.hash,
    body: body
  };

  req.edit(info, req, next, opts, function(ereq, eres, edit) {
    var modified = eres.modified();
    if(output) {

      // NOTE: use write so we respect --force
      // if a hash is configured then we should have
      // the original request and response documents
      if(eres.document) {
        write.call(scope, eres.document, req, next);
      // we need to read the result and write it out
      }else{
        write.call(scope, fs.createReadStream(opts.file), req, next);
      }
      // WARN: we don't call next
      return;
    }
    if(!modified) {
      log.warn('no changes detected, aborting');
      return next();
    }else if(modified) {
      log.info('edit complete %s', file);
    }
    next();
  });
}
