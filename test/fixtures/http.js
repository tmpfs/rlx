var querystring = require('querystring');
var mock = require('../util/mock');
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
  {
    id: 'http/put',
    description: 'Send a PUT request',
    cmd: [
      'http',
      'put',
      server + '/' + querystring.escape(database),
      '-h',
      'Accept: application/json'
    ]
  },
  {
    id: 'http/del',
    description: 'Send a DELETE request',
    cmd: [
      'http',
      'del',
      server + '/' + querystring.escape(database),
      '-h',
      'Accept: application/json'
    ]
  },
];

module.exports = fixtures;
