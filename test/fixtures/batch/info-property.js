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
      },
      header: ['X-Couch-Full-Commit: true', 'X-Forwarded-For: 127.0.0.1'],
      glob: ['*.txt', '*.md', '*.html'],
      query: 'rev=0-1'
    }
  ]
}

module.exports = batch;
