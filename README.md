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
Usage: rlx <command> [-c] [--color|--no-color] [-c|--compress]
           [--recursive] [--force] [--http] [--trace] [--debug]
           [--info] [--warn] [--error] [--help] [--version]
           [-s|--server=<url>] [-d|--database=<name>] [-i|--id=<id>]
           [-a|--attachment=<file>] [-r|--rev=<rev>]
           [-u|--username=<name>] [-p|--password=<pass>]
           [-o|--output=<file>] [-f|--file=<file>] [-j|--json=<json>]
           [-t|--template=<name>] [-q|--query=<params...>]
           [-h|--header=<key:value...>] [-g|--glob=<pattern...>]
           [--destination=<url>] [--ddoc=<name>] [-n|--name=<name>]
           [--feed=<type>] <args>

Command line interface for couchdb.

Options:

Command should be one of: admin, user, database, security, document, docs,
attach, replicate, application, local, login, logout, session, config, meta,
stats, tasks, log, restart, uuids, edit, template, lint, level, whoami, runconf,
help.

Commands:
 admin                  Manage server administrators.
 user, usr              Manage server users.
 database, db           Manage databases.
 security, sec          Get or set database security.
 document, doc          Manage documents.
 docs                   Bulk document tasks.
 attach, att            Manage document attachments.
 replicate, repl        Replicate a database.
 application, app       Manage design document applications.
 local, lcl             Manage local documents.
 login                  Login to a server.
 logout                 Logout of current session.
 session, sess          Session authentication.
 config, conf           Manage server configuration.
 meta, info             Print server information.
 stats                  Print server statistics.
 tasks                  Print active tasks.
 log                    Tail server log file.
 restart                Restart a server.
 uuids                  Print list of uuids.
 edit                   Edit a document.
 template, tpl          Manage template files.
 lint                   Lint javascript and json.
 level, lvl             Get or set the server log level.
 whoami                 Get current user information.
 runconf, rc            Runtime configuration.
 help                   Show help for commands.

Arguments:
 -g, --glob=[pattern...]
                        File match pattern(s).
     --[no]-color       Enable or disable terminal colors.
 -d, --database=[name]  Database name.
 -i, --id=[id]          Document identifier.
 -a, --attachment=[file]
                        Attachment file path.
 -r, --rev=[rev]        Document revision.
 -u, --username=[name]  Authentication username.
 -p, --password=[pass]  Authentication password.
 -o, --output=[file]    Write response to output file.
 -f, --file=[file]      Read JSON input from file.
 -j, --json=[json]      JSON string literal (overrides --file).
 -t, --template=[name]  Name of a template file.
 -c, --compress         Compact JSON output format (zero indent).
 -q, --query=[params...]
                        Query string parameters.
 -h, --header=[key:value...]
                        Additional HTTP headers.
 -s, --server=[url]     Database server.
     --recursive        Read directories recursively.
     --destination=[url]
                        Copy destination.
     --force            Force file overwrite.
     --ddoc=[name]      Design document id.
 -n, --name=[name]      Design document function name (view|update|show|list).
     --feed=[type]      Poll feed type.
     --http             Enable HTTP logs.
     --trace            Set log level to trace.
     --debug            Set log level to debug.
     --info             Set log level to info.
     --warn             Set log level to warn.
     --error            Set log level to error.
     --help             Display this help and exit.
     --version          Print version and exit.

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

To generate man pages run (requires [manpage](https://github.com/freeformsystems/cli-manpage)):

```
npm run manual
```

Generated man pages are in the [man](https://github.com/freeformsystems/rlx/blob/master/doc/man) directory, to dynamically generate man pages set `NODE_ENV` to `devel` and execute the help command:

```
NODE_ENV=devel ./bin/rlx help db
```

### Readme

To build the readme file from the partial definitions (requires [mdp](https://github.com/freeformsystems/mdp)):

```
npm run readme
```

### Cheatsheet

To generate the cheatsheet (requires [mdp](https://github.com/freeformsystems/mdp)):

```
npm run cheatsheet
```

Generated by [mdp(1)](https://github.com/freeformsystems/mdp).

[couchdb]: http://couchdb.apache.org
[node]: http://nodejs.org
[npm]: http://www.npmjs.org
[man]: https://github.com/freeformsystems/rlx/blob/master/doc/man
[mdp]: https://github.com/freeformsystems/mdp
[manpage]: https://github.com/freeformsystems/cli-manpage
