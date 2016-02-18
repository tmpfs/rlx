var mock = require('../mock');
var pkg = mock.paths.pkg;
var program = mock.program;

var hs = require('./home');
var ht = require('../teardown/home');

var alias = {
  init: function(done) {
    hs.mock(function() {
      var file = mock.file('setup-alias-init.json');
      var args = ['as', 'init', '-o', file, '--force', '--no-color'];
      var def = program(require(pkg), mock.name)
      def.program.on('complete', function(/*req*/) {
        ht.restore(done);
      })
      def.parse(args);
    });
  }
}

module.exports = alias;
