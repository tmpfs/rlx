$0
==

Command line interface for couchdb.

Designed for parity with the couchdb HTTP API, run `help <cmd>` for more information on individual commands.

<!--- top-level commands and options -->

## Commands

* `info: info, meta`: Print server information.
* `stats: stats`: Print server statistics.
* `uuids: uuids`: Print list of uuids.
* `database: database, db`: Manage databases.
* `tasks: tasks`: Print active tasks. 
* `log: log`: Tail server log file. 
* `config: config, conf`: Manage server configuration.
* `restart: restart`: Restart a server.
* `session: session, sess`: Cookie-based session authentication.
* `admin: admin`: Manage server administrators.
* `user: user, usr`: Manage server users.
* `login`: Login to a server.
* `logout`: Logout of current session.
* `list: list, ls`: List databases.
* `security: security, sec`: Get or set security document.
* `edit: edit`: Edit a document.
* `template: template, tpl`: Manage template files.
* `lint: lint`: Lint javascript and json.
* `document: document, doc`: Manage documents.
* `level: level, lvl`: Get or set the server log level.

## Options

* `-s, --server [url]`: Database server.
* `-d, --database [name]`: Database name.
* `-u, --username [name]`: Authentication username.
* `-p, --password [pass]`: Authentication password.
* `-o, --output [file]`: Write response to output file.
* `-f, --file [file]`: Read JSON input from file.
* `-j, --json [json]`: JSON string literal (overrides --file).
* `-t, --template [name]`: Name of a template file.
* `--force`: Force file overwrite.
* `--id [id]`: Document identifier.
* `--rev [rev]`: Document revision.
* `--ddoc [name]`: Design document id.

<!--- command definitions -->

### Database

Commands for creating, deleting and modifying databases.

#### Commands

* `info: info, meta`: Get database information.
* `exists: exists`: Check database existence.
* `add: add`: Create a database.
* `rm: rm`: Remove a database.
* `changes: changes`: Get database changes.
* `commit: commit`: Ensure full commit.
* `compact: compact`: Compact database.
* `cleanup: cleanup`: Remove stale view indices.
* `limit: limit`: Get or set revisions limit.

### Log

#### Options

* `offset: --offset [num]`: Offset in bytes for the log tail. 
* `bytes: --bytes [num]`: Bytes to be returned, default is 1000.

### Config

#### Commands

* `get: get`: Get server configuration.
* `set: set`: Set server configuration.
* `rm: rm`: Delete server configuration.

### Uuids

#### Options

* `count: --count [num]`: Number of uuids to fetch. 

### Session

#### Commands

* `get: get`: Get session authentication.
* `set: set`: Authenticate a session.
* `rm: rm`: Logout a session.

### Admin

#### Description

To add an administrator specify a username and password after the `add` command:

```
$0 admin add <username> <password>
```

#### Commands

* `ls: ls`: List administrators.
* `get: get`: Get an administrator.
* `add: add`: Create an administrator.
* `rm: rm`: Delete an administrator.

### Security

#### Commands

* `get: get`: Get the security document.
* `set: set`: Set the security document.

### Template

#### Commands

* `ls: ls`: List templates.
* `get: get`: Print template file.
* `parse: parse`: Parse template file and print result.

### User

#### Commands

* `ls: ls`: List users.
* `add: add`: Create a user.
* `get: get`: Get a user document.
* `edit: edit`: Edit a user document.
* `rm: rm`: Remove a user document.
* `passwd: passwd`: Set an existing user password.

### Document

#### Commands

* `ls: ls`: List documents.
* `add: add`: Create a document.
* `get: get`: Get a document.
* `rm: rm`: Remove a document.
* `rev: rev`: Get a document revision.

### Level

#### Commands

* `info: info`: Set log level to `info`.
* `debug: debug`: Set log level to `debug`.
* `error: error`: Set log level to `error`.
* `warn: warn`: Set log level to `warning`.
* `none: none`: Set log level to `none`.

### Restart

#### Description

Upon success (202 status code) by default this command will poll the server waiting for it to become available again. You can control this behaviour in the `restart` section of an rc file.

* `poll`: Boolean indicating whether polling is enabled, default is `true`.
* `interval`: Integer milliseconds between poll attempts, default is `2000`.
* `max`: Integer indicating the maximum number of retry attempts, default is `10`.

<!--- custom sections -->

## Log

All log output is sent to `stderr`, response documents are printed to `stdout`.

## History

This program was originally implemented in bash shell script, see https://github.com/freeformsystems/rlx-shell.

Bash was chosen for ease of readline integration and the ability to concisely pipe between programs amongst other features. However implementing a complex program in shell script is non-trivial and it needed to rely on external languages for JSON support.

The original implementation whilst almost feature complete was deprecated in
favour of a pure javascript version. In addition the original implementation
started from a pure interactive REPL perspective with a view to implementing
non-interactive support later - it never happened.

For the javascript program an inverse approach is taken, the REPL is the last
feature to be implemented.
