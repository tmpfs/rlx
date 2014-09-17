function test(req, str) {
  return req.rc.alias.match.test(str || '');
}

module.exports = {
  test: test,
  init: require('./init'),
  build: require('./build'),
  load: require('./load'),
  parse: require('./parse'),
  find: require('./find'),
  expand: require('./expand'),
  strip: require('./strip'),
}
