var mock = require('../../../util/mock');

var batch = {
  server: mock.server.default,
  exec: [
    {
      cmd: ['info']
    }
  ]
}

module.exports = batch;
