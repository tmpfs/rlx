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

err.nosub = err('ENO_SUBCOMMAND');
err.subcommand = err('EUNKNOWN_SUBCOMMAND');
err.command = err('EUNKNOWN_COMMAND');

err.server = err('ESERVER_REQUIRED');
err.db = err('EDATABASE_REQUIRED');
err.id = err('EID_REQUIRED');
err.document = err('EDOCUMENT_REQUIRED');

err.tpl = err('ETEMPLATE_REQUIRED');
err.tplexport = err('ETEMPLATE_EXPORT');
err.tplreturn = err('ETEMPLATE_RETURN');

err.username = err('EUSERNAME_REQUIRED');
err.password = err('EPASSWORD_REQUIRED');

err.section = err('ECONFIG_SECTION_REQUIRED');
err.key = err('ECONFIG_KEY_REQUIRED');
err.value = err('ECONFIG_VALUE_REQUIRED');

err.illegal = err('EILLEGAL_DATABASE_NAME');

err.dbfile = err('ENO_DB_FILE');
err.template = err('EUNKNOWN_TEMPLATE');

err.fsexists = err('EFS_FILE_EXISTS');

err.header = err('EHEADER_PARSE');

err.dir = err('EDIRECTORY_REQUIRED');
err.few = err('ETOO_FEW_ARGUMENTS');

err.rckey = err('ERC_KEY_REQUIRED');
err.rcvalue = err('ERC_VALUE_REQUIRED');
err.rcfile = err('ERC_FILE_REQUIRED');
err.rcparse = err('ERC_VALUE_PARSE');

// alias
err.noalias = err('EUNKNOWN_ALIAS');
err.aliasexists = err('EALIAS_EXISTS');
err.aliasempty = err('EALIAS_EMPTY');
err.aliasfile = err('EALIAS_FILE_REQUIRED');

module.exports = err;
