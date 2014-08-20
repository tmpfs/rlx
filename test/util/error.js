var expect = require('chai').expect;

function err(key) {
  expect(key).to.be.a('string');
  return function onError(err, errors) {
    var def = errors[key];
    expect(def).to.be.an('object');
    expect(err).to.be.instanceof(Error);
    expect(err.key).to.eql(def.key);
    function fn() {
      throw err;
    }
    expect(fn).throws(Error);
  }
}

err.server = err('ESERVER_REQUIRED');
err.username = err('EUSERNAME_REQUIRED');
err.password = err('EPASSWORD_REQUIRED');
err.subcommand = err('EUNKNOWN_SUBCOMMAND');
err.command = err('EUNKNOWN_COMMAND');


err.section = err('ECONFIG_SECTION_REQUIRED');
err.key = err('ECONFIG_KEY_REQUIRED');
err.value = err('ECONFIG_VALUE_REQUIRED');

err.illegal = err('EILLEGAL_DATABASE_NAME');
err.db = err('EDATABASE_REQUIRED');


err.id = err('EID_REQUIRED');
err.dbfile = err('ENO_DB_FILE');
err.template = err('EUNKNOWN_TEMPLATE');

err.fsexists = err('EFS_FILE_EXISTS');

module.exports = err;