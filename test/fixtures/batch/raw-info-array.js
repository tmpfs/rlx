var mock = require('../../util/mock');

var batch = {
  bail: true,
  raw: true,
  server: mock.server.default,
  database: mock.database.default,
  exec: [
    ['info']
  ]
}

module.exports = batch;
