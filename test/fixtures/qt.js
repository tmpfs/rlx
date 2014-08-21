var config = require('../util/config');

var qt = [
  {
    cmd: [
      "info",
      '-s=' + config.server.default
    ]
  }
]

module.exports = qt;
