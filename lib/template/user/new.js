module.exports = function template(req, cb) {
  var doc = {
    _id: this.id,
    name: this.name,
    password: this.password,
    roles: this.roles,
    type: 'user'
  }
  cb(null, doc);
}
