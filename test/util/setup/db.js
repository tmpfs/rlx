var cdb = require('cdb');
var dbh = new cdb();
var mock = require('../mock');

var db = {
  add: function(opts, cb){
    if(typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    opts = opts || {};
    opts.server = opts.server || mock.server.default;
    opts.db = opts.db || mock.database.default;
    dbh.db.add(opts, cb);
  }
}

module.exports = db;