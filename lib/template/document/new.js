module.exports = function(req, cb) {
  var doc = {
    _id: req.vars.id
  }
  delete req.vars.id;
  for(var z in req.vars) {
    doc[z] = req.vars[z];
  }
  cb(null, doc);
}
