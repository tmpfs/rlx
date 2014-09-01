var cdb = require('cdb');
var dbh = new cdb();
var mock = require('../mock');

var db = {
  rm: function(opts, cb){
    opts = opts || {};
    opts.server = opts.server || mock.server.default;
    opts.db = opts.db || mock.database.default;
    dbh.db.rm(opts, cb);
  }
}

module.exports = db;
