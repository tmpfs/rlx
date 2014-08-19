var parser = require('./parser');

var schemas = {
  id: require('../schema/params/query/document/get')
}

module.exports = function parse(req, next) {
  req.query = req.query || {};
  if(this.id) {
    var name = this.options().id.key();
    parser.call(this, name, this.id, schemas.id, req, next);
  }
}
