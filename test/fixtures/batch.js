var mock = require('../util/mock');
var fsutil = require('../util/fsutil');

var fixtures = [

  // BATCH
  {
    id: 'batch/parse',
    description: 'Parse a batch file',
    cmd: [
      'batch',
      'parse',
      fsutil.batchfile('info.js')
    ]
  },
  {
    id: 'batch/exec',
    description: 'Execute a batch file',
    cmd: [
      'batch',
      'exec',
      fsutil.batchfile('info.js')
    ]
  },
];

module.exports = fixtures;
