module.exports = function template(req, cb) {
  var doc = {
    _id: this.id,
    name: this.name,
    password: this.password,
    roles: Array.isArray(this.roles)
      ? this.roles : this.roles ? [this.roles] : [],
    type: 'user'
  }
  cb(null, doc);
}
