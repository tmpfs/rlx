Table of Contents
=================

* [rlx](#rlx)
  * [Install](#install)
  * [Documentation](#documentation)
  * [Usage](#usage)
  * [Developer](#developer)
    * [Test](#test)
      * [Environment](#environment)
    * [Documentation](#documentation-1)
    * [Manual](#manual)
    * [Readme](#readme)
    * [Cheatsheet](#cheatsheet)

rlx
===

Command line interface for [couchdb](http://couchdb.apache.org) designed for POSIX systems.

Requires [node](http://nodejs.org) and [npm](http://www.npmjs.org).

## Install

```
npm i -g rlx
```

## Documentation

The documentation for the program is available via the `help` command, for those familiar with [couchdb](http://couchdb.apache.org) the [cheatsheet](https://github.com/freeformsystems/rlx/blob/master/doc/cheatsheet.md) is a good place to start.

## Usage

```
Usage: rlx <command> [-h] [--color|--no-color] [--force] [--trace]
           [--debug] [--info] [--warn] [--error] [-h|--help]
           [--version] [-s|--server=<url>] [-d|--database=<name>]
           [-u|--username=<name>] [-p|--password=<pass>]
           [-o|--output=<file>] [-f|--file=<file>] [-j|--json=<json>]
           [-t|--template=<name>] [--id=<id>] [--rev=<rev>]
           [--ddoc=<name>] [--feed=<type>] <args>

Command line interface for couchdb.

Options:

Command should be one of: info, stats, uuids, database, tasks, log, config,
restart, session, admin, user, login, logout, security, edit, template, lint,
document, level, help.

Commands:
 info, meta         Print server information.
 stats              Print server statistics.
 uuids              Print list of uuids.
 database, db       Manage databases.
 tasks              Print active tasks.
 log                Tail server log file.
 config, conf       Manage server configuration.
 restart            Restart a server.
 session, sess      Cookie-based session authentication.
 admin              Manage server administrators.
 user, usr          Manage server users.
 login              Login to a server.
 logout             Logout of current session.
 security, sec      Get or set security document.
 edit               Edit a document.
 template, tpl      Manage template files.
 lint               Lint javascript and json.
 document, doc      Manage documents.
 level, lvl         Get or set the server log level.
 help               Show help for commands.

Arguments:
     --id=[id]      Document identifier.
     --[no]-color   Enable or disable terminal colors.
 -d, --database=[name]
                    Database name.
 -u, --username=[name]
                    Authentication username.
 -p, --password=[pass]
                    Authentication password.
 -o, --output=[file]
                    Write response to output file.
 -f, --file=[file]  Read JSON input from file.
 -j, --json=[json]  JSON string literal (overrides --file).
 -t, --template=[name]
                    Name of a template file.
     --force        Force file overwrite.
 -s, --server=[url] Database server.
     --rev=[rev]    Document revision.
     --ddoc=[name]  Design document id.
     --feed=[type]  Poll feed type.
     --trace        Set log level to trace.
     --debug        Set log level to debug.
     --info         Set log level to info.
     --warn         Set log level to warn.
     --error        Set log level to error.
 -h, --help         Display this help and exit.
     --version      Output version information and exit.

Log:
All log output is sent to `stderr`, response documents are printed to `stdout`.



History:
This program was originally implemented in bash shell script, see https://github.com/freeformsystems/rlx-shell.

Bash was chosen for ease of readline integration and the ability to concisely pipe between programs amongst other features. However implementing a complex program in shell script is non-trivial and it needed to rely on external languages for JSON support.

The original implementation whilst almost feature complete was deprecated in
favour of a pure javascript version. In addition the original implementation
started from a pure interactive REPL perspective with a view to implementing
non-interactive support later - it never happened.

For the javascript program an inverse approach is taken, the REPL is the last
feature to be implemented.


Report bugs to https://github.com/freeformsystems/rlx/issues.
```

## Developer

Developed against `couchdb@1.6.0`, behaviour in earlier versions is undefined.

### Test

Tests require a clean [couchdb](http://couchdb.apache.org) installation running in *admin party* mode.

```
npm test
```

Quick test executes commands in series but bypasses code coverage and test assertions:

```
npm run qt
```

#### Environment

* `rlx_test_server` - Specify the server to run tests against, default is `http://localhost:5984`.

### Documentation

To generate all documentation (manual, readme, cheatsheet etc):

```
npm run docs
```

### Manual

To generate man pages run:

```
npm run manual
```

Generated man pages are in the [man](https://github.com/freeformsystems/rlx/blob/master/doc/man) directory.

To dynamically generate man pages set `NODE_ENV` to `devel` and execute a help command:

```
NODE_ENV=devel ./bin/rlx help db
```

### Readme

To build the readme file from the partial definitions (requires [mdp](https://github.com/freeformsystems/mdp)):

```
npm run readme
```

### Cheatsheet

To generate the cheatsheet:

```
npm run cheatsheet
```

Generated by [mdp(1)](https://github.com/freeformsystems/mdp).

[couchdb]: http://couchdb.apache.org
[node]: http://nodejs.org
[npm]: http://www.npmjs.org
[man]: https://github.com/freeformsystems/rlx/blob/master/doc/man
[mdp]: https://github.com/freeformsystems/mdp
