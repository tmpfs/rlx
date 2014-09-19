var mock = require('../../../util/mock');

var batch = {
  bail: true,
  server: mock.server.default,
  database: mock.database.default,
  interactive: false,
  // comment this out and it will do it's thing
  noop: true,
  exec: [
    'db add'
  ]
}

for(var i = 0;i < 101;i++) {
  batch.exec.push(
    {
      cmd: ['doc', 'add', "@num=" + Math.random()],
      id: i,
      // you could achieve the same result
      // by declaring a json object too
      //json: {
        //num: Math.random()
      //}
    }
  );
}

batch.exec.push('db rm');

module.exports = batch;
