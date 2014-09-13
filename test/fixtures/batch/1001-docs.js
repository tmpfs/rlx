var mock = require('../../util/mock');

var batch = {
  bail: true,
  server: mock.server.default,
  database: mock.database.default,
  interactive: false,
  exec: [
    'db add'
  ]
}

for(var i = 0;i < 1;i++) {
  batch.exec.push(
    {
      cmd: ['doc', 'add'],
      id: i,
      json: {
        num: Math.random()
      }
    }
  );
}

//batch.exec.push('db rm');

module.exports = batch;
