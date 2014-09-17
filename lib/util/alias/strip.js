function strip(req, str) {
  return (str || '').replace(req.rc.alias.match, '');
}

module.exports = strip;
