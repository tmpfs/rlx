var path = require('path');
var os = require('os');
var base = path.normalize(path.join(__dirname, '..', '..'));
var lib = path.join(base, 'lib');

function dirs(req, home) {
  var rlx = path.join(home, '.rlx');
  req.dirs = req.dirs || {};
  req.dirs.home = home;
  req.dirs.rlx = rlx;
  req.dirs.tmp = os.tmpdir();
  req.dirs.base = base;
  req.dirs.lib = lib;
  req.dirs.tpl = {
    system: path.join(lib, 'template')
  }
  req.dirs.user = {
    template: path.join(rlx, 'template')
  }
}

module.exports = dirs;
