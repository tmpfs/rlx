var path = require('path');

function resolve(file) {
  if(file === '.') {
    return process.cwd();
  }
  if(/^\//.test(file)) {
    return file;
  }
  return path.normalize(path.join(process.cwd(), file)).replace(/\/+$/, '');
}
module.exports = resolve;
