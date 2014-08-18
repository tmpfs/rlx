var validate = require('../validate');

function qsvalidate(source, descriptor, options, cb) {
  return validate(source, descriptor, options, cb);
}

module.exports = qsvalidate;
