module.exports = function(config) {
  var pkg = config.paths.pkg;
  var program = config.program;
  var database = config.database.default;
  return {
    add: function(done) {
      var mock = config.file('mock-database-add.json');
      var args = [
        'db',
        'add',
        '-d=' + database,
        '--force',
        '--no-color',
        '-s=' + config.server.default,
        '-o', mock
      ];
      var def = program(require(pkg), config.name)
      def.program.on('complete', function(req) {
        done();
      })
      def.parse(args);
    },
    rm: function(done) {
      var mock = config.file('mock-database-rm.json');
      var args = [
        'db',
        'rm',
        '-d=' + database,
        '--force',
        '--no-color',
        '-s=' + config.server.default,
        '-o', mock
      ];
      var def = program(require(pkg), config.name)
      def.program.on('complete', function(req) {
        done();
      })
      def.parse(args);
    },
    user: {
      add: function(done) {
        var mock = config.file('mock-user-add.json');
        var args = [
          'user',
          'add',
          '@name=' + config.user.name,
          '@password=' + config.user.pass,
          '--force',
          '--no-color',
          '-s=' + config.server.default,
          '-o', mock
        ];
        var def = program(require(pkg), config.name)
        def.program.on('complete', function(req) {
          done();
        })
        def.parse(args);
      },
      rm: function(done) {
        var mock = config.file('mock-user-rm.json');
        var args = [
          'user',
          'rm',
          '--id=' + config.user.name,
          '--force',
          '--no-color',
          '-s=' + config.server.default,
          '-o', mock
        ];
        var def = program(require(pkg), config.name)
        def.program.on('complete', function(req) {
          done();
        })
        def.parse(args);
      }
    }
  }
}




