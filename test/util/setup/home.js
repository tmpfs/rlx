var mock = require('../mock');

var home = {
  mock: function(cb){
    module.exports.HOME = process.env.HOME;
    process.env.HOME = mock.usr.home;
    cb();
  }
}

module.exports = home;
