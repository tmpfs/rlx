var mock = require('../util/mock');
var setup = require('../util/setup');
var teardown = require('../util/teardown');

var database = mock.database.default
  , server = mock.server.default;

var fixtures = [
  // http
  {
    id: 'http/get',
    description: 'Send a GET request',
    cmd: [
      'http',
      'get',
      server + '/',
      '-h',
      'Accept: application/json'
    ]
  },
];

module.exports = fixtures;
