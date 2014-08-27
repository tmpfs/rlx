$0
==

Command line interface for couchdb.

Designed for parity with the couchdb HTTP API, run `help <cmd>` for more information on individual commands.

<!--- top-level commands and options -->

## Commands

* `admin: admin`: Manage server administrators.
* `user: user, usr`: Manage server users.
* `database: database, db`: Manage databases.
* `security: security, sec`: Get or set database security.
* `document: document, doc`: Manage documents.
* `local: local, lcl`: Manage local documents.
* `attach: attach, att`: Manage document attachments.
* `login`: Login to a server.
* `logout`: Logout of current session.
* `session: session, sess`: Session authentication.
* `config: config, conf`: Manage server configuration.
* `info: info, meta`: Print server information.
* `stats: stats`: Print server statistics.
* `tasks: tasks`: Print active tasks. 
* `log: log`: Tail server log file. 
* `restart: restart`: Restart a server.
* `uuids: uuids`: Print list of uuids.
* `edit: edit`: Edit a document.
* `template: template, tpl`: Manage template files.
* `lint: lint`: Lint javascript and json.
* `level: level, lvl`: Get or set the server log level.
* `whoami: whoami`: Get current user information.

## Options

* `-s, --server [url]`: Database server.
* `-d, --database [name]`: Database name.
* `-i, --id [id]`: Document identifier.
* `-a, --attachment [file]`: Attachment file path.
* `-r, --rev [rev]`: Document revision.
* `-u, --username [name]`: Authentication username.
* `-p, --password [pass]`: Authentication password.
* `-o, --output [file]`: Write response to output file.
* `-f, --file [file]`: Read JSON input from file.
* `-j, --json [json]`: JSON string literal (overrides --file).
* `-t, --template [name]`: Name of a template file.
* `-c, --compress`: Compact JSON output format (zero indent). 
* `-q, --query [params...]`: Query string parameters.
* `-h, --header [key: value...]`: Additional HTTP headers.
* `--force`: Force file overwrite.
* `--ddoc [name]`: Design document id.
* `--feed [type]`: Poll feed type. 
* `--http`: Enable HTTP logs.

<!--- command definitions -->

### Database

Commands for creating, deleting and modifying databases.

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List databases.
* `info: info, meta`: Get database information.
* `exists: exists`: Check database existence.
* `add: add`: Create a database.
* `rm: rm`: Remove a database.
* `temp: temp`: Execute a temporary view.
* `changes: changes`: Get database changes.
* `commit: commit`: Ensure full commit.
* `compact: compact`: Compact database.
* `cleanup: cleanup`: Remove stale view indices.
* `updates: updates`: Poll for database updates.
* `limit: limit`: Get or set revisions limit.

### Document

Commands for creating, deleting, retrieving and modifying documents.

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List documents.
* `add: add`: Create a document.
* `get: get`: Get a document.
* `cp: cp`: Copy a document.
* `rm: rm`: Remove a document.
* `rev: rev, head`: Get a document revision.
* `revs: revs`: Get a document with all known revisions.
* `meta: meta`: Get a document with meta information.
* `revsinfo: revsinfo`: Get a document with revision information.
* `conflicts: conflicts`: Get a document with conflicts information.
* `dc: dc`: Get a document with deleted conflicts information.

### Local

Commands for creating, deleting, retrieving and modifying `local` documents, it is not possible to list local documents, see the `couchdb` documentation.

If no subcommand is specified an error is reported.

#### Commands

* `add: add`: Create a local document.
* `get: get`: Get a local document.
* `cp: cp`: Copy a local document.
* `rm: rm`: Remove a local document.

### Attach

Commands for creating, deleting, retrieving and modifying document attachments.

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List attachments.
* `up: up`: Upload an attachment.
* `dl: dl`: Download an attachment.
* `get: get`: Get attachment information.
* `rm: rm`: Remove an attachment.

### Log

This command attempts to parse the raw response text into an array of JSON log records. If you wish to print the raw log text specify the `${opt_raw_long}` option.

The server will often respond with partial log records (incomplete lines) depending upon the state of the log file and the `${opt_offset_long}` and the `${opt_bytes_long}` options. When parsing to JSON these incomplete log records are ignored, to view these partial log records use the `${opt_raw_long}` option.

#### Options

* `offset: --offset [num]`: Offset in bytes for the log tail. 
* `bytes: --bytes [num]`: Bytes to be returned, default is 1000.
* `raw: --raw`: Print log records as plain text.

### Config

If no subcommand is specified `get` is invoked.

#### Commands

* `get: get`: Get server configuration.
* `set: set`: Set server configuration.
* `rm: rm`: Delete server configuration.

### Uuids

#### Options

* `count: --count [num]`: Number of uuids to fetch. 

### Session

If no subcommand is specified `get` is invoked.

#### Commands

* `get: get`: Get session authentication.
* `set: set`: Authenticate a session.
* `rm: rm`: Logout a session.

### Admin

#### Description

If no subcommand is specified `ls` is invoked.

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

If no subcommand is specified `get` is invoked.

#### Description

The `security` commands modify the security document for a database. The `rm` subcommand is a slight misnomer as the document is not actually removed, it is shorthand for setting the security document to the empty object (`{}`) which removes all database level security.

The `rm` subcommand name was chosen for consistency with other subcommands and is more concise than `reset`.

#### Commands

* `get: get`: Get the security document.
* `set: set`: Set the security document.
* `rm: rm`: Reset the security document.

### Template

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List templates.
* `get: get`: Print template file.
* `parse: parse`: Parse template file and print result.

### User

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List users.
* `add: add`: Create a user.
* `get: get`: Get a user document.
* `edit: edit`: Edit a user document.
* `rm: rm`: Remove a user document.
* `passwd: passwd`: Set an existing user password.

### Level

If no subcommand is specified `get` is invoked.

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

### Whoami

#### Description

Alias for the `session get` command.

### Login

#### Description

Alias for the `session set` command.

### Logout

#### Description

Alias for the `session rm` command.

<!--- custom sections -->

## Files

Input files are read with the following precedence: `stdin`, `${opt_json_long}` and `${opt_file_long}`. 

To read from `stdin` the special option (-) must be specified, if data is written to `stdin` it must be a JSON document or an error is reported. When the `${opt_json_long}` option is specified it must be a valid JSON string literal, be sure to enclose in quotes to prevent shell errors.

If both the `${opt_json_long}` and `${opt_file_long}` options are specified the JSON literal is preferred.

Files specified using the `${opt_file_long}` option may be a file system path or URL. Relative paths are resolved according to the current working directory. For example:

```
$0 ${cmd_lint_long} ${opt_file_short} package.json
$0 ${cmd_lint_long} ${opt_file_short} http://registry.npmjs.org
$0 ${cmd_lint_long} ${opt_json_short} '{}'
cat package.json | $0 - ${cmd_lint_long}
```

<!--  `this` is a quotation -->

## Log

All log output is sent to `stderr`, response documents are printed to `stdout`. You may set the program log level using the `${opt_logtrace_pipe}`, `${opt_logdebug_pipe}`, `${opt_loginfo_pipe}`, `${opt_logwarn_pipe}` and `${opt_logerror_pipe}` options. The default log level is `info`.

Enable logging of HTTP requests and responses by also specifiying `${opt_http_pipe}` option, any level specified using the aforementioned options applies to the HTTP logger. When the HTTP log level is `info` basic request and response information is logged (HTTP verb, request URL and response status code). When the log level is `debug` then query string parameters will also be logged, if the `trace` level is specified then request and response headers are also printed.

## Headers

Similar to `curl(1)` arbitrary HTTP headers are accepted using the `${opt_header_pipe}` option (note the short version is lowercase), you may specify as many headers as you like although `Content-Type` and `Accept` are ignored, a warning is printed if you attempt to use them.

If the value of the `${opt_header_long}` option is incorrect (bad syntax) an error is reported.

Use the HTTP logging option to inspect the request headers:

```
$0 doc get -s {server} -d {database} -i {document} \
  -h 'if-none-match: "{revision}"' --http --trace
```

The `${opt_rev_long}` would be more concise in the above example, however it illustrates the ability to set and inspect headers.

## Query String

The `couchdb` database server accepts many different query string parameters for different API calls, as such the query string parameter handling is flexible.

To specify query string parameters use the `${opt_query_pipe}` option, this option is repeatable so you may specify each parameter as an individual option or combine the entire query string.

Some options map to query string parameters (for example `${opt_rev_pipe}`) if you specify an option that maps to a query string parameter and the same parameter using `${opt_query_long}` then the specific option value has precedence.

You may specify a leading `?` but it is unnecessary and not recommended.

To elucidate you can fetch document revision information with the `revsinfo` shortcut command:

```
$0 doc revsinfo -s {server} -d {database} -i {id}
```

But you could also use `${opt_query_pipe}`:

```
$0 doc get -s {server} -d {database} -i {id} -q 'revsinfo=true'
```

An example of precedence:

```
$0 doc get -s {server} -d {database} -i {id} -r {rev} -q 'rev={revision}'
```

The value of `{rev}` will be used *not* `{revision}`.

## Highlight

The program will attempt to syntax highlight JSON and javascript documents using either `source-highlight` or `pygmentize`. Document highlighting will not occur under the following conditions:

* Neither `source-highlight` or `pygmentize` is in `\$PATH`.
* The `stdout` stream is not a `tty` (redirection).
* The `${opt_output_pipe}` option is specified (output is a file).
* The `${opt_color_no}` option is specified (disables all ANSI escape sequences).
* The rc file `highlight` section is invalid (does not contain json and js objects).
* The output to print is neither JSON or javascript (${opt_raw_long} specified).

## History

This program was originally implemented in bash shell script, see https://github.com/freeformsystems/rlx-shell.

Bash was chosen for ease of readline integration and the ability to concisely pipe between programs amongst other features. However implementing a complex program in shell script is non-trivial and it needed to rely on external languages for JSON support.

The original implementation whilst almost feature complete was deprecated in favour of a pure javascript version. In addition the original implementation started from a pure interactive REPL perspective with a view to implementing non-interactive support later - it never happened.

For the javascript program an inverse approach is taken, the REPL is the last feature to be implemented.
