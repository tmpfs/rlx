var Couch = require('cdb'), dbh;
var logger = require('cli-logger');

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
function options(options) {
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
  //options.qs = req.query;
  return options;
}

module.exports = db;
module.exports.options = options;
