var parser = require('./parser');

var schemas = {
  id: require('cdb').schema.docquery
}

module.exports = function parse(req, next) {
  req.query = req.query || {};

  var query = this.query;
  console.dir(req.result);
  console.log('got query  string arg %j', query);

  var validates = this.id;
  if(validates) {
    if(this.id) {
      var name = this.options().id.key();
      parser.call(this, name, this.id, schemas.id, req, next);
    }
  }else{
    next.call(this);
  }
}
