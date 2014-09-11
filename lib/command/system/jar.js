var jar = require('../../jar');

module.exports = function sysjar(info, req, next) {
  req.print(jar, req, next);
}
