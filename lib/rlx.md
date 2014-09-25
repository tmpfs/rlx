$0
==

Command line interface for couchdb.

Designed for parity with the couchdb HTTP API, run `help <cmd>` for more information on individual commands, start an interactive session with `${0} ${cmd_interactive_short}`.

<!--- top-level commands and options -->

## Commands

* `admin: admin`: Manage server administrators.
* `user: user, usr`: Manage server users.
* `database: database, db`: Manage databases.
* `security: security, sec`: Get or set database security.
* `document: document, doc`: Manage documents.
* `bulk: bulk`: Bulk document tasks.
* `attach: attach, att`: Manage document attachments.
* `replicate: replicate, repl`: Replicate a database.
* `batch: batch`: Batch file execution.
* `application: application, app`: Manage design document applications.
* `local: local, lcl`: Manage local documents.
* `login: login, in <username> <server>`: Login to a server.
* `logout: logout, out <username> <server>`: Logout of current session.
* `session: session, sess`: Session authentication.
* `config: config, conf`: Manage server configuration.
* `info: info`: Print server information.
* `stats: stats`: Print server statistics.
* `tasks: tasks`: Print active tasks. 
* `log: log`: Tail server log file. 
* `restart: restart`: Restart a server.
* `uuids: uuids`: Print list of uuids.
* `edit: edit`: Edit a document.
* `template: tpl`: Manage template files.
* `lint: lint`: Lint javascript and json.
* `level: level, lvl`: Get or set the server log level.
* `whoami: whoami`: Get current user information.
* `rc: runconf, rc`: Runtime configuration.
* `alias: alias, as`: Manage alias shortcuts.
* `system: system, sys`: System utilities.
* `json: json, j`: Grep JSON and more.
* `http: http, tt`: Low-level HTTP requests.
* `interactive: interactive, i`: Interactive REPL console.

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
* `-h, --header [key:val...]`: Additional HTTP headers.
* `-g, --glob [pattern...]`: File match pattern(s).
* `--log-level [level]`: Set the log level.
* `--log-http`: Enable HTTP logs.
* `--[no]-interactive`: Disable interactive prompts.
* `--recursive`: Read directories recursively.
* `--noop`: Print db network requests, do not send them.
* `--destination [url]`: Copy destination.
* `--force`: Force file overwrite.
* `--ddoc [name]`: Design document id.
* `nm:-n, --name [name]`: Design document function name (view|update|show|list).
* `--feed [type]`: Poll feed type. 

<!--- command definitions -->

### Json

JSON documents are parsed synchronously using the parse method provided by V8, the behaviour with very large documents is unknown.

#### Commands

* `grep: grep, re <ptn...> <file...>`: Find objects matching a pattern.

#### Options

* `--flat`: Flatten object keys, joined on a period.
* `--[no]-keys`: Include keys in the search.
* `--values`: Include values in the search.

#### Grep

To search documents specify regular expression(s) (and/or glob patterns) and one or more files. If input is specified on stdin, ${opt_file_long} or ${opt_json_long} it becomes the first in the list of documents to search. You can specify more files to search but they must have a `.json` file extension.

Grep arguments are gathered by looking for additional files (arguments with a `.json` extension) then pattern matches (//gim), if either test fails the argument is treated as dot-style property lookup.

The `${cmd_grep_long}` command will attempt to print a map of matched keys to values, if there are any key collisions then an array of objects is printed. If a match returns a single result then the value for the match is printed, use `${opt_raw_long}` to print the result as plain text. This is useful if a match resolves to a string and you would like the string unquoted:

```
cat package.json | $0 j re - version --raw
```

The `${opt_flat_long}` flag will join object keys on a period which reduces the likelihood of key collisions but does not prevent them.

Use `${opt_long_pipe}` to show internal match information.

#### Patterns

By default regular expression  patterns only search keys, add the `${opt_values_long}` option to also search values. You may search values only by negating the key pattern match: `${opt_keys_no} ${opt_values_long}`.

Glob patterns match on the object keys joined on a forward slash, they never match against values.

When combining patterns with `${opt_glob_pipe}` the matches are combined.

Patterns are specified using typical regular expression notation:

```
cat package.json | $0 j re - '/cli-.*/'
```

#### Example

Multiple property lookup:

```
$0 j re -c name version package.json
# {"name":"rlx","version":"0.1.399"}
```

Deep property lookup:

```
$0 j re -c bugs.url package.json
# "https://github.com/freeformsystems/rlx/issues"
```

Unquote string values:

```
$0 j re -c bugs.url --raw package.json
# https://github.com/freeformsystems/rlx/issues
```

Regular expression pattern matching (remember to single quote patterns):

```
$0 j re '/cli-i.*/' package.json
```

```json
{
  "cli-input": "~0.0.91",
  "cli-interface": "~1.0.8"
}
```

### Http

Perform HTTP requests using any of the available methods GET, PUT, POST, DELETE, HEAD and COPY.

All subcommands require an absolute `<url>` using either the `http` or `https` scheme. You may reference an alias for `<url>` but if the alias does not have a valid `server` field it is not possible to form an absolute URL, see ${see_alias}.

The `${opt_query_long}` and `${opt_header_long}` options are respected and there are no restrictions on the headers that may be sent.

The options `${opt_server_long}`, `${opt_database_long}`, `${opt_id_long}` and `${opt_rev_long}` have no effect.

For PUT and POST requests any document specified using the rules that apply to stdin, `${opt_file_long}` and `${opt_json_long}` is sent as the body for the request. This means that at the moment only JSON is supported, in the future this will be addressed.

#### Commands

* `get: get <url>`: Send a GET request.
* `put: put <url>`: Send a PUT request.
* `post: post <url>`: Send a POST request.
* `del: delete, del <url>`: Send a DELETE request.
* `head: head <url>`: Send a HEAD request.
* `copy: copy <url>`: Send a COPY request.

### Alias

Aliases allow users to map names to commonly used locations, a location being a combination of `server`, `database`, document `id` and `rev`.

Reference an alias with a colon ':' prefix.

For alias subcommands that accept an `<alias>` argument it may be specified with or without the prefix.

#### Commands

* `init: init`: Create an alias file.
* `parse: parse <alias>`: Parse an alias and print the result.
* `get: get <alias>`: Print an alias.
* `add: add <alias>`: Add an alias.
* `edit: edit`: Open the alias file in an editor.
* `rm: rm <alias>`: Remove an alias.
* `ls: ls`: List aliases.
* `print: print, p`: Print the alias file.

#### Usage

The typical use case for aliases is server administrators managing multiple servers but an alias does not necessarily have to have a `server` field, it may reference a commonly used `database` or document `id`.

#### Init

Run `${cmd_alias_long} ${cmd_init_long}` to create an alias file, this includes two default aliases:

* `lh`: http://localhost:5984
* `lhs`: https://localhost:6984

You can now reference the alias location in arguments (`$0 ${cmd_info_long} -s :lh`) or in an interactive session (`cd :lh`).

#### Create

Create aliases using the `${cmd_add_long}` command and specify one or more of `${opt_username_long}`, `${opt_server_long}`, `${opt_database_long}`, `${opt_id_long}` and `${opt_rev_long}`.

In an interactive session you can create an alias from the current location by just specifying the alias name (except `/`).

#### Expansion

Aliases are expanded using the rule that fields encapsulated by the alias definition are overwritten by username, database, document and revision specified in the alias reference.

Such that the full reference (for the default `:lh` alias):

```
:user@lh/db/doc?rev=0-1
```

Expands to:

```javascript
{
  "username": "user",
  "database": "db",
  "id": "doc",
  "rev": "0-1",
  "server": "http://localhost:5984",
  "name": "lh"
}
```

You may override the alias definition and expansions with specific options such as `${opt_database_long}`, `${opt_id_long}` etc.

Use the `${cmd_get_long}` command to inspect alias expansion on an existing alias, run the `${cmd_parse_long}` command to verify the parsing rules.

When not running in an interactive session the `${cmd_get_long}` command will change directory and print the result of the alias merged with other options (`${opt_database_short}` etc).

#### Inspect

Use the `${cmd_print_long}` command to print the alias file contents, the `${cmd_ls_long}` command will show a map of keys to URLs (adding `${opt_long_short}` is equivalent to `${cmd_print_long}`).

Print an individual alias with the `get` command.

#### Match Pattern

You may alter the regular expression used for matching alias names in the `alias.match` rc configuration field but choose wisely reserved shell special characters would be awkward and `@` would conflict with template variable names.

The full match of the regular expression is stripped to determine the alias name.

#### Files

Aliases are stored in `alias.json` within `~/.$0`.

### Batch

Parse and execute batch files.

Batch files are executed in the context of the current process.

#### Commands

* `parse: parse <file...>`: Parse files and print result.
* `exec: exec <file...>`: Execute batch files.

#### Batch Definitions

Batch file definitions may be Javascript or JSON, Javascript is preferable and recommended. Use the `${cmd_parse_long}` command to inspect what would be executed.

Reserved keywords in batch files are `conf`, `exec` and `cmd`.

A batch file is an object with an `exec` array:

```javascript
module.exports = {
  server: '{server}',
  exec: [
    'info'
  ]
}
```

Fields defined at the top-level are assigned to the program , such that you can set the server, database and other useful options. These properties last for the duration of the batch file execution.

An entry in the `exec` array may be:

1. A string, it is split into an array of raw arguments using a space character.
2. An array of raw arguments to parse.
3. An object containing a `cmd` array with optional additional fields.

When specifying an object as an `exec` the format is:

```javascript
module.exports = {
  server: '{server}',
  exec: [
    {
      cmd: ['db', 'rm'],
      interactive: false
    }
  ]
}
// => ['db', 'rm', '--no-interactive']
```

You can specify arguments that accept multiple parameters as arrays and they are expanded to multiple options:


```javascript
module.exports = {
  server: '{server}',
  exec: [
    {
      cmd: ['tpl', 'ls'],
      glob: ['db/**', 'design/**']
    }
  ]
}
// => ['tpl', 'ls', '--glob', 'db/**', '--glob', 'design/**']
```

The `${opt_json_long}` option is a special case, you may specify a string and it is treated as a JSON string literal any other type is passed to `JSON.stringify`. For example:

```javascript
module.exports = {
  server: '{server}',
  exec: [
    {
      cmd: ['lint'],
      json: {
        field: "value"
      }
    }
  ]
}
// => ['lint', '--json', '{"field":"value"}']
```

For advanced use cases that need asynchronous logic you may export a function.

The function is passed a callback function with the signature `cb(err, batch)` where `batch` should be a valid batch file.

```javascript
module.exports = function batch(cb) {
  var def = {
    server: '{server}',
    exec: [
      {
        cmd: ['info']
      }
    ]
  }
  cb(null, def);
}
```

### System

System debugging utilities.

The `${cmd_log_long}` command accepts the `${opt_raw_long}` option as an alternative to the default JSON output.

#### Commands

* `log: log`: Print log buffer contents.
* `jar: jar`: Print cookie jar.
* `prg: prg`: Print state of program.
* `req: req`: Print state of middleware request object.
* `dbh: dbh`: Print state of database handle.
* `env: env`: Print environemnt variables.
* `err: err`: Print exceptions encountered.
* `dir: dir`: Print internal location information.
* `hist: hist`: Print command history.
* `conf: conf`: Print program configuration.
* `auth: auth`: Print current authentication information.

### Interactive

Launch an interactive console with `$0 ${cmd_interactive_short}`, interactive consoles may not be nested. Help is available via `?`, `${opt_help_long}` and `${cmd_help_long}`. If `${opt_interactive_no}` is specified it is ignored.

#### Commands

* `who: who`: List login sessions.
* `su: su <username> <server>`: Switch user session.
* `pwd: pwd`: Print current location.
* `cd: cd <path>`: Set current location.
* `open: open, o <url>`: Open a URL.
* `shorthelp: ?`: Short help.
* `exit: q, quit, exit`: Quit interactive console.

#### Options

* `--fu, --futon`: Open the futon web interface.
* `--fa, --fauxton`: Open the fauxton web interface.
* `--do, --docs`: Open the couchdb documentation.

#### Location

Run the `${cmd_cd_long}` command to change the current location, inspect the location with `${cmd_pwd_long}`, clear the current location with `${cmd_cd_long} /`.

The `${cmd_cd_long}` command accepts '..' paths so you may drop down the location or switch parent location.

Alias shortcuts are expanded when specified as a path to `${cmd_cd_long}`, see ${see_alias}.

If no explicit path or alias is specified (or the path is a `./` reference) then the path is treated as relative to the current location.

When referencing databases with forward slash characters you must URL encode the forward slash (%2F).

```
cd /                      # url => /
cd http://localhost:5984  # url => http://localhost:5984
cd db                     # url => http://localhost:5984/db
cd doc                    # url => http://localhost:5984/db/doc
cd 0-1                    # url => http://localhost:5984/db/doc?rev=0-1
cd ../../../altdb         # url => http://localhost:5984/altdb
cd ../db                  # url => http://localhost:5984/db
cd ..                     # url => http://localhost:5984
cd ..                     # url => /
cd :lhs                   # url => https://localhost:6984
```

If the path starts with a known protocol (http or https) then you can expand a URL to a location:

```
cd http://usr@localhost:5984/db/doc?rev=0-1
```

Yields the location:

```
{
  "server": "http://localhost:5984",
  "database": "db",
  "username": "usr",
  "id": "doc",
  "rev": "0-1",
  "url": "http://usr@localhost:5984/db/doc?rev=0-1"
}
```

#### Arguments

Commands are not required in interactive mode. Provided a command is not specified in the interactive console you may also set certain arguments directly:

```
--log-http                # enable http logging
--no-log-http             # disable http logging
-d {db}                   # set current database
-d                        # clear current database
--no-color                # disable colors
```

Alternatively without the leading hyphens using the long name:

```
no-color                  # disable colors
color                     # enable colors
log-http log-level debug  # enable http logging (debug)
```

This arguments are tested against a whitelist of property names defined in `console.cascade.allow`. It makes sense for some options to cascade to commands executed in the future (`${opt_color_yes}`, `${opt_log_level_long}` etc) however for some options it is counter-intuitive, `${opt_raw_long}` for example.

The default list should cater for must use cases but you may modify it if you like.

The only current known collision is between the `${cmd_help_long}` command and `${opt_help_long}` option, in this case `${cmd_help_long}` is preferred, you can still use `${opt_help_long}` but no shortcut is available.

#### Open

Run `${cmd_open_long}` with no arguments to open the current server, otherwise specify a `<url>`. Use the shortcut flags to jump straight to futon, fauxton or the couchdb documentation. Aliases are expanded to their full URL, if a shortcut flag is specified then the server for the alias is combined with the shortcut.

The command executed to open a URL is set in the `console.launch.url` rc configuration property. By default it is configured to run the OSX specific open(1), linux users should change this to their preferred executable.

#### History Interpreter

An experimental history command interpreter is enabled by default that recognizes index based references such as `!!` (or `!-1`) and `!1`, 

#### Files

The history file is read and written from `~/.rlx/.history`, when this command is invoked the file (and parent directories) are created if they do not exist.

### Bulk

Commands for operating on multiple documents.

You may `${cmd_push_long}` an arbitrary directory of json documents as a bulk database operation but first it is recommended you inspect the output of the `${cmd_ls_long}` command to verify the document collation is as desired.

Use the `${opt_glob_pipe}` option to filter bulk operations.

If no subcommand is specified an error is reported.

#### Commands

* `ls: ls <id...> <dir>`: List documents.
* `push: push <dir>`: Push a directory of documents.
* `pull: pull <id...> <dir>`: Pull documents to a directory.
* `revs: revs <id...>`: Fetch multiple document revisions.
* `rm: rm <id...>`: Delete multiple documents.

#### Options

* `-l, --long`: Long listing (include documents).
* `--strict`: Abort on error.
* `--lenient`: Skip errors in a bulk response.
* `--[no]-flat`: Use flat collation (no attachments).
* `--[no]-auto-id`: Use automatic id generation.

#### Layout

The file system layout for a *docs* directory looks like:

```
docs
├── doc-attachments
│   ├── attachment.txt
│   ├── deep
│   │   └── alt-attachment.txt
│   └── index.json
├── doc1.json
└── doc2.json
```

The document collation will include top-level `.json` and `.js` files in the list of documents to include, these documents cannot have attachments, for example: `doc1.json` and `doc2.json`.

If a top-level directory exists and the directory contains a known index file (`index.json` or `index.js`) then the index file is used as the document and all other files in the directory are treated as attachments. Nested directories will be included as attachments with a path, for example: `deep/alt-attachment.txt` is the attachment name for the document with an id of `doc-attachments`.


The result of using `${cmd_docs_long} ${cmd_ls_long}` on this layout is:

```json
{
  "doc-attachments": {
    "file": "/path/docs/doc-attachments/index.json",
    "name": "index.json",
    "path": "doc-attachments/index.json",
    "attachments": [
      {
        "file": "/path/docs/doc-attachments/attachment.txt",
        "name": "attachment.txt",
        "path": "doc-attachments/attachment.txt"
      },
      {
        "file": "/path/docs/doc-attachments/deep/alt-attachment.txt",
        "name": "alt-attachment.txt",
        "path": "doc-attachments/deep/alt-attachment.txt"
      }
    ]
  },
  "doc1.json": {
    "file": "/path/docs/doc1.json",
    "name": "doc1.json",
    "path": "doc1.json"
  },
  "doc2.json": {
    "file": "/path/docs/doc2.json",
    "name": "doc2.json",
    "path": "doc2.json"
  }
}
```

Because the files have not been loaded from disc the document identifers are not available add the `${opt_long_short}` flag to view collated documents and generated identifiers.

#### Document List

Listing local documents is performed by invoking `${cmd_ls_long}` with a single argument (`<dir>`), to list remote documents specify multiple document identifiers (`<id...>`).

#### Document Identifiers

If a document explicity defines an `_id` property than it is always used otherwise a document id will automatically be generated based on the name of the file (or directory).

When generating identifiers for documents with a known file extension, the extension is removed, for documents with attachments (directories) the name of the directory is used.

You may disable the automatic id injection with `${opt_auto_id_no}` or setting the rc configuration property `docs.id.auto` to `false` or the corresponding environment variable:

```
rlx_docs_id_auto=false \
  $0 ${cmd_docs_long} ${cmd_ls_short} ${opt_long_short} <dir>
```

Note that the identifiers are generated and assigned to the `id` field of the file object but they are not assigned to the document's `_id` property.

Use this setting if you would like the server to generate an id for those documents that do not have an explicit `_id`.

#### Document Collation

The default collation matches the `LAYOUT` but you may change this behaviour if you are not using attachments and wish to operate on all the documents in a directory with `${opt_flat_yes}` or by setting the rc configuration property `docs.flat` to `true`:

```
rlx_docs_flat=true \
  $0 ${cmd_docs_long} ${cmd_ls_short} ${opt_long_short} <dir>
```

Flat collation includes all files of known file extensions recursively and generates an identifier using the path relative to `<dir>`, no files found are treated as attachments.

If the `${opt_glob_pipe}` option is used the patterns are matched after file collation and the relative file path must match one of the glob patterns to be included.

#### Bulk Deletion

Use the `${cmd_rm_long}` command to remove multiple documents. This removal is forceful in that it fetches the latest revisions for the specified documents before attempting the bulk deletion.

Specify the `${opt_strict_long}` option and if any error occurs while fetching document revisions no bulk deletion is performed, an array of errors is printed.

#### Bulk Revisions

Use the `${cmd_revs_long}` command to fetch revisions for multiple document identifiers:

```
$0 ${cmd_docs_long} ${cmd_revs_short} -s {server} -d {db} <id...>
```

By default the listing is a map of identifiers to revisions:

```
{
  "8faf0d3bae0a0520e1a459ff9c003ddd": "1-967a00dff5e02add41819138abb3284d"
}
```

Use the `${opt_long_pipe}` option for an array of objects:

```
[
  {
    "id": "8faf0d3bae0a0520e1a459ff9c003ddd",
    "rev": "1-967a00dff5e02add41819138abb3284d"
  }
]
```

To view the raw result of the query use `${opt_raw_long}`:

```
{
  "total_rows": 4,
  "offset": 0,
  "rows": [
    {
      "id": "15136c47b4865ea2222196de47004f59",
      "key": "15136c47b4865ea2222196de47004f59",
      "value": {
        "rev": "1-967a00dff5e02add41819138abb3284d"
      }
    }
  ]
}
```

Errors in the response are included in the output by default:

```
{
  "15136c47b4865ea2222196de47004f59": "1-967a00dff5e02add41819138abb3284d",
  "unknown-document": {
    "error": "not_found"
  }
}
```

To suppress inclusion of errors use the `${opt_lenient_long}` option.

### Application

Commands for managing applications (design documents).

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List design documents.
* `push: push <dir>`: Push a design document.
* `deploy: deploy <dir>`: Deploy views in live environment.
* `get: get`: Get a design document.
* `info: info`: Get design document information.
* `cp: cp`: Copy a design document.
* `head: head`: Get minimal design document information.
* `attach: attach, att`: Attachment commands for design documents.
* `view: view`: Query a design document view.
* `update: update`: Put a design document update.
* `show: show`: Show a document.
* `list: list`: Run a list function on a view.
* `rewrite: rewrite [verb] <path>`: Run a rewrite rule path.
* `rm: rm`: Remove a design document.

#### Terminology

The terms `app`, `application` and `design document` are used interchangeably, for all intents and purposes an application *is* a design document except it is represented on the file system as a series of files rather than a single JSON document with attachments.

#### Filesystem Layout

The layout for an application at it's simplest just includes an `index.json` file which indicates the language for a design document. However without any additional files it is an empty design document, a simple application might look like:

```
app/
├── index.json
└── validate_doc_update.js
```

A complete application layout looks like:

```
app/
├── attachments
├── docs
├── filters
├── index.json
├── lib
├── lists
├── rewrites.js
├── shows
├── updates
├── validate_doc_update.js
└── views
    └── lib
```

#### System Templates

The bundled system template directory contains:

* `minimal`: Minimum required files to define an application.
* `validate`: An application template with a `valiate_doc_update` function.
* `view`: A view based template with a single view named `all`.
* `full`: A full application template including all directories.

#### Identifiers

Most subcommands allow `${opt_id_long}` and `${opt_ddoc_long}` to be used interchangeably (they always refer to a design document id), however the commands `${cmd_show_long}`, `${cmd_list_long}` and `${cmd_update_long}` distinguish between a design document id (`${opt_ddoc_long}`) and a document id (`${opt_id_long}`) as they accept a document to use during execution.

#### Attachments

The `${cmd_attach_short}` subcommand is provided as a convenience for attaching to design documents, it defers to the top-level `${cmd_attach_short}` command with the `${opt_ddoc_long}` option specified, see `${cmd_help_long} ${cmd_attach_short}` for more information.

#### Deploy

Typically during development you would use the `${cmd_push_long}` command to upload the design document, it is then your responsibility to query a view to update the view indices for the design document. In a live environment the correct procedure involves a few document copies, waiting for view index updates to complete and cleaning stale views.

The `${cmd_deploy_long}` command will follow the steps:

1. Delete any existing backup or new design documents.
2. Check design document for existence, if it does not exist it is saved.
3. Copy the existing design document to a backup.
4. Upload the new design document with a new name.
5. Query a view on the new design document.
6. Wait for view index generation to complete.
7. Copy the new design document to the existing design document.
8. Delete the backup and new design document.
9. Clean up stale view indices for the database.

#### See

${see_attach}

### Replicate

Commands for starting, stopping and inspecting database replications.

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List active replications.
* `add: add`: Start a replication.
* `rm: rm`: Stop a replication.

### Database

Commands for creating, deleting and modifying databases.

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List databases.
* `info: info, meta`: Get database information.
* `head: head`: Check database existence.
* `add: add`: Create a database.
* `bulk: bulk`: Bulk insert/update.
* `rm: rm <db>`: Remove a database.
* `temp: temp`: Execute a temporary view.
* `changes: changes`: Get database changes.
* `commit: commit`: Ensure full commit.
* `compact: compact`: Compact database.
* `cleanup: cleanup`: Remove stale view indices.
* `updates: updates`: Poll for database updates.
* `limit: limit`: Get or set revisions limit.
* `purge: purge`: Purge documents.
* `missing-revs: missingrevs, mrevs`: Get document revisions that do not exist.
* `revs-diff: revsdiff, rdiff`: Get document revisions diff.

### Document

Commands for creating, deleting, retrieving and modifying documents.

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List documents.
* `add: add`: Create a document.
* `get: get`: Get a document.
* `edit: edit`: Edit a document.
* `cp: cp`: Copy a document.
* `head: head`: Get minimal document information.
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

When using the `${cmd_cp_long}` command to copy a document if `${opt_destination_long}` does not specify an absolute URL then the document is copied as a local document, ie, if you wish to copy a local document to a regular document you will need to use an absolute URL for the destination.

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
* `up: up <file...>`: Upload an attachment.
* `dl: dl <patterns...> <dir>`: Download an attachment.
* `get: get`: Get attachment information.
* `head: head`: Head attachment information.
* `rm: rm`: Remove an attachment.

#### Design Documents

You can operate on attachments for a design document by specifying the `${opt_ddoc_long}` option. If `${opt_id_long}` and `${opt_ddoc_pipe}` are combined the attachment operation is performed on a design document.

#### File Names

File names for uploaded and downloaded attachments are determined automatically based on either the file system path or the name of an attachment. It is possible to set the name of an attachment for single files using the `${opt_attachment_pipe}` option.

When uploading files a relative path is included to prevent file name collision as best as possible, however if you specify multiple directories with relative paths that collide the last file in the list will be the final attachment.

#### Upload

The `${cmd_up_long}` command accepts file arguments in the form `<files...>`. An error is reported if no files are specified.

To upload attachment(s) specify files (or directories) to the `${cmd_up_long}` command:

```
$0 att up -s {server} -d {db} -i {docid} {file}
```

If one of the target files is a directory then all files in that directory (but not sub-directories) are uploaded. To also upload files in sub-directories use the `${opt_recursive_long}` option:

```
$0 att up -s {server} -d {db} -i {docid} --recursive {dir}
```

It is possible to specify the name for an uploaded attachment but only if a single file is being attached:

```
$0 att up -s {server} -d {db} -i {docid} -a {attname} {file}
```

You can filter the files to be uploaded by specifying `${opt_glob_pipe}` option(s):

```
$0 att up -s {server} -d {db} -i {docid} --recursive -g '*.txt' {dir}
```

When glob pattern(s) are specified the file will be included in the list if one of the glob patterns matches the file path.

#### Download

The `${cmd_dl_long}` command accepts file arguments in the form `<pattern...> <dir>`. An error is reported if an output directory is not specified (or is not a directory) or if no glob patterns are specified.

The download logic first fetches the document so that patterns can be matched against the known existing attachments for the document. This means that `${cmd_dl_long}` incurs an additional request prior to downloading attachments.

To download a single attachment use the attachment name as the pattern:

```
$0 att dl -s {server} -d {db} -i {docid} file.txt ./target
```

To download multiple attachments specify a series of file glob patterns followed by an output directory:

```
$0 att dl -s {server} -d {db} -i {docid} '**/**' ./target
```

Attachment downloads respect the `${opt_force_long}` option, the program will report an error if the target file already exists and `${opt_force_long}` has not been specified.

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

* `get: get [section] [key]`: Get server configuration.
* `set: set <section> <key> <value>`: Set server configuration.
* `rm: rm <section> <key>`: Delete server configuration.

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

#### Commands

* `ls: ls`: List administrators.
* `get: get <username>`: Get an administrator.
* `add: add <username> <password>`: Create an administrator.
* `rm: rm <username>`: Delete an administrator.

### Security

If no subcommand is specified `get` is invoked.

#### Description

The `security` commands modify the security document for a database. The `rm` subcommand is a slight misnomer as the document is not actually removed, it is shorthand for setting the security document to the empty object (`{}`) which removes all database level security.

The `rm` subcommand name was chosen for consistency with other subcommands and is more concise than `reset`.

#### Commands

* `get: get`: Get the security document.
* `set: set`: Set the security document.
* `edit: edit`: Edit the security document.
* `rm: rm`: Reset the security document.

### Rc

Runtime configuration is provided by JSON files named `.rlxrc`.

The `${cmd_init_long}` command when invoked with no arguments will copy the system rc file to the user directory `~/.rlx` otherwise if an output directory is specified it is copied to the target directory.

If no subcommand is specified `print` is invoked.

#### Commands

* `init: init [dir]`: Copy system rc file.
* `ls: ls`: List rc files.
* `print: print, p`: Print configuration.
* `get: get <key>`: Get configuration property.
* `set: set <key> <value>`: Set configuration property.
* `rm: rm <key>`: Remove configuration property.
* `dir: dir`: Print rc file search path.

#### Options

* `--search-path [dir...]`: Append directories to the rc search path.
* `-l, --long`: Long listing (include file contents).

### Template

These commands operate on two types of template, `file templates` that correspond to a single file and may be parsed to produce a JSON document using variables declared on the command line and `application templates` which are directories that are collated to a design document. For more information on application templates run `${cmd_help_long} ${cmd_application_short}`.

Templates may be referenced using the `${opt_template_pipe}` option (or the first additional argument), the value may be a file system path or reference to lookup in the search path. Short references are relative to the template directory and may or may not include the file extension.

For commands that accept a template (${cmd_init_long}, ${cmd_print_long} and ${cmd_parse_long}) file system paths are resolved first before looking in the template search path. In the case of `${cmd_init_long}` the template is used as the source for the copy operation. For other commands if a file is located it is treated as a template (and parsed in the case of the `${cmd_parse_long}` command), if a directory is located it is collated as if it were an application template.


To refer to a file template in the search path specify the relative path, eg: `user/new`, to reference an application prefix the template name with `design/`, eg: `design/minimal`.

Template references are resolved by first searching the user template directory and then the system template directory. You can modify these search paths with `${opt_system_long}`, `${opt_user_long}` and `${opt_search_path_help}` options, see `FILES` for more information.

If no subcommand is specified `ls` is invoked.

#### Commands

* `init: init <template> <dir> [name]`: Copy templates.
* `ls: ls`: List template files.
* `print: print, p <template>`: Print template.
* `parse: parse <template>`: Parse template and print result.
* `dir: dir`: Print template search path.

#### Options

* `--[no]-system`: Include system templates.
* `--[no]-user`: Include user templates (overrides --system).
* `--search-path [dir...]`: Modify template search path.

#### Files

Files are read by default first from `~/.rlx/template` (user templates) and then from the templates bundled with the program `lib/template` (system templates).

If a `rc` file declares an array of search paths (`search.paths.template`) these are prepended to the list of search paths, if `${opt_search_path_long}` has been specified the values are prepended to the search path.

So the precedence is:

* cli (`${opt_search_path_long}`)
* rc file configuration
* user templates
* system templates

When using `${opt_user_long}` and `${opt_system_long}` cli search paths and rc search paths are still included.

Full negation by combining `${opt_user_no}` and `${opt_system_no}` when no rc or cli search paths are defined is not allowed, the search path will be a single entry including the system templates.

Application templates are read from the `design` sub-directory.

#### Init

The `${cmd_init_long}` command when called with no arguments will attempt to copy all system templates to the user template directory. When a template is specified and no output directory is specified the template is copied to the current working directory.

To import a particular template from the system directory to the user directory specify the output directory:

```
$0 tpl init design/minimal ~/.rlx/template
```

If the destination already exists an error is reported unless the `${opt_force_long}` option has been specified.

When copying application templates, the `design` directory is included in the destination, this is intentional and allows for applications that have multiple design documents.

You can change the name of the destination template with an additional `<name>` argument.

#### List

The `${cmd_ls_long}` command may be used to list all template files as JSON, use the `${opt_raw_long}` option to print a tree hierarchy of the template files, you may filter the list using the `${opt_glob_pipe}` option.

Empty directories and hidden files (those starting with a period '.') are not included in the list.

#### Print

When using the `${cmd_print_long}` command on file templates the contents of the template file are printed, when used on application templates a design document is collated from the directory contents and printed.

The `${cmd_print_long}` and `${cmd_parse_long}` commands behave the same on application templates (they print the collated document) except `${cmd_parse_long}` will include additional information such as an attachment file list.

#### Variables

Variables only apply to file templates for application templates they will be ignored.

Variables are declared with an `@` symbol, for example, `@foo=bar` will set the template variable named `foo` to the string `bar`.

Template values are coerced to their native types and it is possible to create an array by using a comma delimiter, eg: `@foo=bar,baz`.

Templates must export a function. Functions are invoked asynchronously and are passed the request object and a callback function:

```
module.exports = function template(req, cb){
  return cb(null, {});
}
```

They are invoked in the scope of the parsed variables object so if the template was parsed with `@id=foo` and looked like:

```
module.exports = function template(req, cb){
  var doc = {
    _id: this.id
  }
  return cb(null, doc);
}
```

The result would be a JSON document such as:

```
{
  "_id": "foo"
}
```


### User

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List users.
* `add: add <name> <password> <@vars...>`: Create a user.
* `get: get <name>`: Get a user document.
* `edit: edit`: Edit a user document.
* `rm: rm <name>`: Remove a user document.
* `passwd: passwd`: Set an existing user password.

### Level

If no subcommand is specified `get` is invoked.

#### Commands

* `get: get`: Get log level. 
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

Log out a user from the current authentication session. If no arguments are specified the current session is deleted, otherwise the stored cookie information for the user is removed.

Use the `${cmd_who_long}` command to view currently available login sessions, to view current authentication information run `${cmd_whoami_long}`.

Alias for the `session rm` command.

<!--- custom top-level sections -->

## Expansion

Expansion is performed on the `${opt_server_pipe}` option for absolute URLs and aliases. You may specify the database, document and revision such that the URL:

```
-s http://localhost:5984/data%2Fstore/path/document?rev=0-1
```

Is expanded to the equivalent of:

```
-s http://localhost:5984 -d data/store -i path/document -r 0-1
```

Note that when referencing databases in the URL form you should URL encode the database name whilst it is not necessary for the `${opt_database_short}` option.

If `${opt_database_long}`, `${opt_id_long}`, `${opt_rev_long}` or `${opt_username_long}` are specified they override any values extracted during expansion.

See ${see_alias} for more information on alias expansion.

## Files

A debug log file (`rlx-debug.log`) is written to the current working directory when an error occurs. The debug log file is written synchronously when the program exits.

The format of this file and under which circumstances it is written is controlled by the rc configuration section:

```
"log": {
  "debug": {
    "clean": true,
    "always": false,
    "interactive": false,
    "json": false,
    "lines": false,
    "indent": 2
  }
}
```

The rules for when a debug log file are written are:

1. If `always` write the file regardless of exit code or interactivity.
2. Otherwise write the file if an error occurs and it is not an interactive session.
3. If `interactive` also write the file for interactive sessions with errors.

The log file by default is a plain text format designed to be quick to scan you can set `json` to `true` for a dump of the log records array, if you also set `lines` to `true` then the output is a newline delimited list of stringified log records compatible with bunyan(1). The `indent` property only applies to JSON output when `lines` is not set.

The `clean` property indicates that the log file should be removed upon successful execution (zero exit code).

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

## Log

All log output is sent to `stderr`, response documents are printed to `stdout`. You may set the program log level using the `${opt_log_level_long}` option. The default log level is `info`.

Enable logging of HTTP requests and responses by also specifiying `${opt_log_http_pipe}` option, any level specified using the `${opt_log_level_long}` option applies to the HTTP logger. When the HTTP log level is `info` basic request and response information is logged (HTTP verb, request URL and response status code), when the log level is `debug` then query string parameters and headers will also be logged.

## Headers

Similar to `curl(1)` arbitrary HTTP headers are accepted using the `${opt_header_pipe}` option (note the short version is lowercase), you may specify as many headers as you like although `Content-Type` and `Accept` are ignored, a warning is printed if you attempt to use them.

If the value of the `${opt_header_long}` option is incorrect (bad syntax) an error is reported.

Use the HTTP logging option to inspect the request headers:

```
$0 doc get -s {server} -d {database} -i {document} \
  -h 'if-none-match: "{revision}"' --log-http --log-level debug
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

## Environment

The `\$HOME` environment variable must be set in order for user configuration data to be loaded, typically for most developer environments this is not an issue however when using `$0(1)` as part of infrastructure deployment you may need to ensure that `\$HOME` is set.

## History

This program was originally implemented in bash shell script, see https://github.com/freeformsystems/rlx-shell.

Bash was chosen for ease of readline integration and the ability to concisely pipe between programs amongst other features. However implementing a complex program in shell script is non-trivial and it needed to rely on external languages for JSON support.

The original implementation whilst almost feature complete was deprecated in favour of a pure javascript version. In addition the original implementation started from a pure interactive REPL perspective with a view to implementing non-interactive support later - it never happened.

For the javascript program an inverse approach is taken, the REPL is the last feature to be implemented.

## See

${see_all}
