var mock = require('../../util/mock');

var batch = {
  server: mock.server.default,
  exec: [
    {
      cmd: ['info'],
      server: mock.server.secure,
    }
  ]
}

module.exports = batch;
