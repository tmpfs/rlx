module.exports = function(doc, req) {
  if(!doc){
    return [null, {code: 400,
      json:
        {
          error: 'missing',
          reason: 'no document to update'
        }
    }];
  }else{
    if(req.body) {
      // assuming json input
      req.body = JSON.parse(req.body);
      doc.list.push(req.body);
    }
    return [doc, {json: {ok: true}}];
  }
}
