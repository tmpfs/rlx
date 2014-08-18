var id = require('./id');

module.exports = function parse(req, next) {
  req.query = req.query || {};
  if(this.id) {
    id.call(this, this.id, req, next);
  }
}
