var path = require('path');
var resolve = require('../resolve');
var fileobject = require('../file-object');

function deconstruct(options, info, req, cb) {
  var scope = this;
  options = options || {};
  var index = 'index'
    , ext = '.json';
  var docs = options.docs || [];
  var dir = options.dir || process.cwd();
  var i, a, files = [], doc, nm, fo, ao, folder;
  for(i = 0;i < docs.length;i++) {
    doc = docs[i];
    nm = doc._id;
    folder = doc._attachments && Object.keys(doc._attachments).length;
    if(!folder) {
      fo = fileobject(path.join(dir, nm) + ext, dir);
    }else{
      fo = fileobject(path.join(dir, nm, index) + ext, dir);
      if(!options.flat) {
        fo.attachments = [];
        for(a in doc._attachments) {
          ao = fileobject(path.join(dir, nm, a), path.join(dir, nm));
          ao.key = a;
          fo.attachments.push(ao);
        }
      }
    }
    if(options.long) {
      fo.id = doc._id;
      fo.document = doc;
    }
    files.push(fo);
  }
  cb(null, {docs: docs, files: files});
}

module.exports = deconstruct;
