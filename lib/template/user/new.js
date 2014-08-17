module.exports = function(req, cb) {
  var doc = {
    _id: req.vars.id,
    name: req.vars.name,
    password: req.vars.password,
    roles: req.vars.roles,
    type: 'user'
  }
  cb(null, doc);
}
