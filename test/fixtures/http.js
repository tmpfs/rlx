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
      'Accept:application/json'
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
      'Accept:application/json'
    ]
  },
  {
    id: 'http/post',
    description: 'Send a POST request',
    cmd: [
      'http',
      'post',
      server + '/' + querystring.escape(database),
      '-h',
      'Accept:application/json',
      '-h',
      'Content-Type:application/json',
      '-j',
      mock.jsondoc
    ]
  },
  {
    id: 'http/head',
    description: 'Send a HEAD request',
    cmd: [
      'http',
      'head',
      server + '/' + querystring.escape(database)
        + '/' + querystring.escape(mock.document.id)
    ]
  },
  {
    id: 'http/copy',
    description: 'Send a COPY request',
    cmd: [
      'http',
      'copy',
      server + '/' + querystring.escape(database)
        + '/' + querystring.escape(mock.document.id),
      '-h',
      'Destination:' + mock.copy.id
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
      'Accept:application/json'
    ]
  },

  // http - errors
  {
    id: 'http',
    description: 'No subcommand for http command',
    cmd: [
      'http'
    ]
  },
];

module.exports = fixtures;
