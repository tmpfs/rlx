var setup = require('../../util/setup');
var teardown = require('../../util/teardown');

var path = require('path');
var config = require('../../util/config');
var pkg = config.paths.pkg;
var program = config.program;
var database = config.database.default;

var assert = config.assert.db;

describe('rlx:', function() {
  this.timeout(5000);
  var revs = [];
  beforeEach(function(done) {
    setup.db.add(function() {
      setup.bulk.add(done);
    });
  })
  afterEach(function(done) {
    teardown.db.rm(done);
  })
  it('should purge documents', function(done){
    var mock = config.file('purge-fetch-document-revisions.json');
    var args = [
      'doc',
      'revsinfo',
      '--no-color',
      '-s',
      config.server.default,
      '-d',
      database,
      '-i',
      'foo',
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.once('complete', function(req) {
      var doc = config.json(mock);
      doc._revs_info.forEach(function(item) {
        revs.push(item.rev);
      });
      def = program(require(pkg), config.name)
      var purge = config.file('purge-document.json');
      var args = [
        'db',
        'purge',
        '--no-color',
        '-s',
        config.server.default,
        '-d',
        database,
        '@' + doc._id + '=' + revs.join(','),
        '-o',
        purge
      ];

      def.program.once('complete', function(req) {
        var doc = config.json(purge);
        config.assert.db.purge(doc, 1);
        done();
      });

      def.parse(args);
    })
    def.parse(args);
  });
  it('should get revsdiff', function(done){
    var mock = config.file('revsdiff.json');
    var args = [
      'db',
      'revsdiff',
      '--no-color',
      '-s',
      config.server.default,
      '-d',
      database,
      '@foo=' + revs.join(','),
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.once('complete', function(req) {
      var doc = config.json(mock);
      config.assert.generic.empty(doc);
      done();
    })
    def.parse(args);
  });
  it('should get missingrevs', function(done){
    var mock = config.file('missingrevs.json');
    var args = [
      'db',
      'mrevs',
      '--no-color',
      '-s',
      config.server.default,
      '-d',
      database,
      '@foo=' + revs.join(','),
      '-o',
      mock
    ];
    var def = program(require(pkg), config.name)
    def.program.once('complete', function(req) {
      var doc = config.json(mock);
      config.assert.db.missingrevs(doc);
      done();
    })
    def.parse(args);
  });
})
