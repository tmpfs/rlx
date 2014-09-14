var Couch = require('cdb'), dbh;
var logger = require('cli-logger');
var stringify = require('../util/stringify');
var jar = require('../jar');

function db(options) {
  if(!dbh || options) {
    options = options || {server: this.server};
    options.stringify = stringify;
    options.jar = jar;
    dbh = new Couch(options);
  }

  return dbh;
}

/**
 *  Add common options to database requests.
 */
function options(req, options) {
  var qs, k;
  options = options || {};
  if(this.server) {
    options.server = this.server || req.rc.server;
  }

  if(this.database && !options.db) {
    options.db = this.database;
  }
  if(options.username || this.username) {
    options.username = options.username || this.username;
  }
  if(this.password) {
    options.password = this.password;
  }

  qs = req.query || {};
  if(options.qs) {
    for(k in options.qs) {
      qs[k] = options.qs[k];
    }
  }
  options.qs = qs;
  //options.qs = options.qs || qs;
  //
  options.noop = this.noop;

  if(this.rev) {
    //override parsed query string
    options.qs.rev = this.rev;
  }

  // local document flag
  options.local = req.document.local;

  // copy destination
  options.destination = this.destination;

  options.headers = {};
  for(k in req.headers) {
    options.headers[k] = req.headers[k];
  }
  return options;
}

module.exports = db;
module.exports.options = options;
