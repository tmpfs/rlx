var setup = require('../setup/home');

var home = {
  restore: function(cb){
    process.env.HOME = setup.HOME;
    cb();
  }
}

module.exports = home;
