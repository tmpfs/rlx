function test(req, str) {
  return req.rc.alias.match.test(str || '');
}

module.exports = {
  test: test,
  init: require('./init'),
  load: require('./load'),
  parse: require('./parse'),
  find: require('./find'),
  expand: require('./expand'),
  strip: require('./strip'),
}
