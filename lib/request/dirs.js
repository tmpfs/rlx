var path = require('path');
var os = require('os');
var base = path.normalize(path.join(__dirname, '..', '..'));
var lib = path.join(base, 'lib');

function dirs(req, home) {
  var name = '.' + this.name();
  var rlx = module.exports.home = path.join(home, name);
  var des = 'design', tpl = 'template', his = '.history';
  var alias = 'alias.json';
  req.dirs = req.dirs || {};
  req.files = req.files || {};
  req.dirs.home = home;
  req.dirs.tmp = os.tmpdir();
  req.dirs.base = base;
  req.dirs.lib = lib;
  req.dirs.design = [
    path.join(rlx, tpl, des),
    path.join(lib, tpl, des)
  ];
  req.dirs.tpl = {
    system: path.join(lib, tpl)
  }
  req.dirs.user = {
    template: path.join(rlx, tpl),
    home: rlx,
    history: path.join(rlx, his),
    alias: path.join(rlx, alias)
  }
  req.files.sh = {
    lang: path.join(lib, 'highlight', 'json.lang'),
    style: path.join(lib, 'highlight', 'json.style')
  }

  // default aliases file
  req.files.alias = path.join(lib,'util', 'alias', 'alias.json');
}

module.exports = dirs;
