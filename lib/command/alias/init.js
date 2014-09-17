var alias = require('../../util/alias');

module.exports = function init(info, req, next){
  alias.init.call(this, info, req, next);
}
