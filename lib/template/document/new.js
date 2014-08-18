module.exports = function(req, cb) {
  var doc = {
    _id: req.vars.id
  }
  cb(null, doc);
}
