var copy = require('../copy');

function init(info, req, next){
  var scope = this, errors = this.errors;
  var file = req.dirs.user.alias;
  var src = req.files.alias;
  var options = {ncp: {clobber: this.force}, source: src, destination: file};
  copy.call(this, info, req, next, options);
}

module.exports = init;
