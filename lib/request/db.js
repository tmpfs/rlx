var Couch = require('cdb'), dbh;
var logger = require('cli-logger');
var stringify = require('../util/stringify');

function db(options) {
  if(!dbh || options) {
    options = options || {server: this.server};
    dbh = new Couch(options);
    if(this.http) {
      dbh.log.useConsoleStream();
      dbh.log.conf = this.log.conf;
      dbh.log.level(this.log.level());
    }
  }
  return dbh;
}

/**
 *  Add common options to database requests.
 */
function options(req, options) {
  options = options || {};
  if(this.server) {
    options.server = this.server;
  }
  if(this.username) {
    options.username = this.username;
  }
  if(this.password) {
    options.password = this.password;
  }
  var qs = req.query || {};
  if(options.qs) {
    for(var k in options.qs) {
      qs[k] = options.qs[k];
    }
  }
  options.qs = qs;
  //options.qs = options.qs || qs;

  if(this.rev) {
    //override parsed query string
    options.qs.rev = this.rev;
  }

  //if(options.attname) {
    //options.file = options.attname;
    //options.attname = path.basename(options.attname);
  //}

  //console.dir(options.qs);

  return options;
}

module.exports = db;
module.exports.options = options;
