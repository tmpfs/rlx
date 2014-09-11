var cdb = require('cdb');
var jar = require('../../../lib/jar');
var dbh = new cdb({jar: jar});
var mock = require('../mock');
var admins = cdb.sections.admins;

var doc = {
  docs: [
    {_id: 'foo'},
    {_id: 'bar'}
  ]
};

var admin = {
  rm: function(opts, cb){
    if(typeof opts === 'function') {
      cb = opts;
      opts = null;
    }
    opts = opts || {};
    opts.jar = jar;
    opts.server = opts.server || mock.server.default;
    opts.section = admins;
    opts.key = opts.key || mock.admin.name;
    opts.value = opts.value || mock.admin.pass;
    dbh.config.rm(opts, cb);
  }
}

module.exports = admin;
