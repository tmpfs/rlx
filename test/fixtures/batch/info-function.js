var mock = require('../../util/mock');

module.exports = function batch(cb) {
  var def = {
    server: mock.server.default,
    exec: [
      {
        cmd: ['info']
      }
    ]
  }
  cb(null, def);
}
