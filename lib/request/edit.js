var editor = require('../util/editor');

/**
 *  Opens an editor.
 */
function edit(info, req, next, opts, cb) {
  new editor.EditorRequest(opts, function(err, ereq) {
    if(err) return req.error(err, req, next);
    new editor.Edit(ereq, function(err, ereq, eres, edit) {
      if(err) return req.error(err, req, next);
      cb(ereq, eres, edit);
    })
  });
}

module.exports = edit;
