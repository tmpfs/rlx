var mock = require('../../util/mock');

var batch = {
  exec: [
    {
      cmd: ['info'],
      id: 'docid',
      error: true,
      color: false,
      json: {
        object: {
          field: [1,2,3]
        }
      }
    }
  ]
}

module.exports = batch;
