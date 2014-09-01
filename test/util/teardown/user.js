var cdb = require('cdb');
var dbh = new cdb();
var mock = require('../mock');

var user = {
  rm: function(opts, cb){
    if(typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    opts = opts || {};
    opts.server = opts.server || mock.server.default;
    opts.db = opts.db || mock.database.users;
    opts.id = opts.id || mock.user.id;
    dbh.doc.rm(opts, cb);
  }
}

module.exports = user;
