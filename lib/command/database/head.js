function getErrorDocumentByStatusCode(code) {
  var doc = {code: code};
  switch(code) {
    case 400:
      doc.error = 'bad_request';
      break;
    case 404:
      doc.error = 'not_found';
      break;
  }
  return doc;
}

module.exports = function head(info, req, next) {
  var opts = req.db.options(req, {db: this.database});
  if(!opts.db) {
    return req.error(this.errors.EDATABASE_REQUIRED, req, next);
  }
  var dbh = req.db();
  dbh.db.info(opts, function(err, res, doc) {
    var code = res && res.statusCode ? res.statusCode : 500;
    if(code !== 200 && code !== 404) {
      doc = getErrorDocumentByStatusCode(code);
    }
    if(err && code !== 200 && code !== 404) {
      return req.error(err, req, next);
    }
    doc = {ok: res.statusCode === 200};
    req.print(doc, req, next);
  })
}
