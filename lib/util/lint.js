var jsonlint = require('jsonlint');

function json(data, cb) {
  var result;
  try{
    result = jsonlint.parse(data);
  }catch(e) {
    return cb(e);
  }
  return cb(null, result);
}

module.exports = {
  json: json
}
