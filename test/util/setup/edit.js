var mock = require('../mock');

var edit = {
  mock: function(cb){
    module.exports.editor = process.env.EDITOR;
    module.exports.visual = process.env.VISUAL;
    process.env.VISUAL = process.env.EDITOR = mock.editor;
    cb();
  }
}

module.exports = edit;
