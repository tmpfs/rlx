var editor = require('../util/editor');
var temp = require('../util/temp');
var stringify = require('../util/stringify');
var types = require('../util/types');

module.exports = function edit(info, req, next) {
  var log = this.log;
  var file = null;
  // should we use a temp local file
  var tmp = false;
  var output = this.output;
  var body = null;


  if(!req.document.body) {
    return req.error(this.errors.EDOCUMENT_REQUIRED, req, next);
  }

  file = req.document.source;
  //console.dir(req.document);
  tmp = req.document.remote || req.document.literal;

  if(tmp) {
    tmp = temp.filepath(req);
  }

  //console.log('output %s', output);
  //console.log('tmp %s', tmp);

  if(tmp) {
    if(req.document.type === types.json) {
      body = stringify(req.document.body, req.rc.indent || 2);
    }else{
      body = '' + req.document.body;
    }
  }

  var opts = {
    file: tmp || file,
    hash: req.rc.edit.hash,
    body: body};

  req.edit(info, req, next, opts, function(ereq, eres, edit) {
    var modified = eres.modified();
    console.log('file was modified: %s', modified);
    //console.log('file was modified: %s', modified);
    if(!modified) {
      log.warn('no changes detected, aborting');
    }else if(output && modified) {
      // TODO: write source file to output file
      log.info('write to output %s', output);
    }else if(modified) {
      console.log('LOG INFO MESSAGE %s', log.info());
      var written = log.info('edit complete %s', file);
      console.log('written to log %s', written);
    }
    next();
  });
}
