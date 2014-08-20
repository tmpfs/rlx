var Couch = require('cdb'), dbh;

function db(options) {
  if(!dbh || options) {
    options = options || {server: this.server};
    dbh = new Couch(options);
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
  return options;
}

module.exports = db;
module.exports.options = options;
