var Couch = require('cdb'), dbh;

function db(options) {
  if(!dbh || options) {
    options = options || {server: this.server};
    dbh = new Couch(options);
  }
  return dbh;
}

module.exports = db;
