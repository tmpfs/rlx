var mock = require('../../util/mock');

var batch = {
  bail: true,
  server: mock.server.default,
  database: mock.database.default,
  interactive: false,
  exec: [
    ['db', 'add'],
    ['db', 'rm']
  ]
}

module.exports = batch;
