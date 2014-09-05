var path = require('path');

function collect(list, options) {
  //var list = this.collect(files, rules.docs);
  options = options || {};
  var indices = options.indices || [], attachments = {};
  var rule = options.rule;
  var docs = [], map = {};
  var i, k, l, v, j, o = {}, id;

  for(i = 0;i < list.length;i++) {
    v = list[i];
    if(rule && options.strip === true) {
      v.path = v.path.replace(rule, '');
    }
    docs.push(v);
    if(path.dirname(v.path) !== '.') {
      id = path.dirname(v.file);
      map[id] = map[id] || [];
      map[id].push(v);
    }
  }

  function isIndex(v) {
    for(var i = 0;i < indices.length;i++) {
      if(v.name === indices[i]) {
        return v;
      }
    }
  }

  function getFolderDocumentId(v) {
    var id = path.basename(path.dirname(v.file));
    var parts = v.path.split(path.sep);
    // got a deep attachment reference
    if(parts.length > 2) {
      return parts[0];
    }
    return id;
  }

  for(k in map) {
    l = map[k];
    for(j = 0;j < l.length;j++) {
      v = l[j];
      id = getFolderDocumentId(v);
      if(isIndex(v)) {
        o[id] = v;
      }else{
        //console.log('adding attachment %s', id);
        attachments[id] =
          attachments[id] || [];
        attachments[id].push(v);
      }
    }
  }

  for(k in o) {
    id = getFolderDocumentId(o[k]);
    if(attachments[id]) {
      o[k].attachments = attachments[id];
    }
  }

  // add top-level file documents
  for(i = 0;i < docs.length;i++) {
    if(docs[i].name === docs[i].path) {
      o[docs[i].name] = docs[i];
    }
  }

  return docs.length
    ? {
        lang: options.lang || this.language || 'javascript',
        files: docs,
        documents: o,
        attachments: attachments} : null;
}

module.exports = collect;
