var setup = require('../setup/edit');

var edit = {
  restore: function(cb){
    process.env.VISUAL = setup.visual;
    process.env.EDITOR = setup.editor;
    cb();
  }
}

module.exports = edit;
