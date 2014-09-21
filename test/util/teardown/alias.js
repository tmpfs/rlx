var mock = require('../mock')
  , fs = require('fs');

var alias = {
  unlink: function(cb) {
    fs.unlink(mock.usr.alias, function(err) {
      cb(err);
    })
  }
}

module.exports = alias;
