var mock = require('../../util/mock');

var batch = {
  bail: true,
  raw: true,
  server: mock.server.default,
  database: mock.database.default,
  exec: [
    {
      cmd: ['info']
    }
  ]
}

module.exports = batch;
