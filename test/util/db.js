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
    bulk: function(done) {
      var mock = config.file('mock-bulk-docs.json');
      var args = [
        'db',
        'bulk',
        '--no-color',
        '-s',
        config.server.default,
        '-d',
        database,
        '@docs=foo,bar',
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
    },
    admin: {
      add: function(done) {
        var mock = config.file('mock-admin-add.json');
        var args = [
          'admin',
          'add',
          config.admin.name,
          config.admin.pass,
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
        var mock = config.file('mock-admin-rm.json');
        var args = [
          'admin',
          'rm',
          config.admin.name,
          '-u',
          config.admin.name,
          '-p',
          config.admin.pass,
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
    },
    doc: {
      add: function(done) {
        var mock = config.file('mock-document-add.json');
        var args = [
          'doc',
          'add',
          '-s=' + config.server.default,
          '-d=' + database,
          '--id=' + config.document.id,
          '@bool=' + config.document.bool,
          '@int=' + config.document.int,
          '@float=' + config.document.float,
          '@arr=' + config.document.arr,
          '@str=' + config.document.str,
          '@nil=' + config.document.nil,
          '--force',
          '--no-color',
          '-o', mock
        ];
        var def = program(require(pkg), config.name)
        def.program.on('complete', function(req) {
          done();
        })
        def.parse(args);
      },
      rm: function(done) {
        var mock = config.file('mock-document-rm.json');
        var args = [
          'doc',
          'rm',
          '-s=' + config.server.default,
          '-d=' + database,
          '--id=' + config.document.id,
          '--force',
          '--no-color',
          '-o', mock
        ];
        var def = program(require(pkg), config.name)
        def.program.on('complete', function(req) {
          done();
        })
        def.parse(args);
      }
    },
  }
}




