var cdb = require('cdb');
var jar = require('../../../lib/jar');
var dbh = new cdb({jar: jar});
var mock = require('../mock');

var user = {
  add: function(opts, cb){
    if(typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    opts = opts || {};
    opts.server = opts.server || mock.server.default;
    opts.db = opts.db || mock.database.users;
    opts.id = opts.id || mock.user.id;
    opts.body = mock.user;
    opts.body.roles = opts.body.roles.split(',');
    dbh.doc.add(opts, cb);
  }
}

module.exports = user;
