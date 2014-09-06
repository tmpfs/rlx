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
* `docs: docs`: Bulk document tasks.
* `attach: attach, att`: Manage document attachments.
* `replicate: replicate, repl`: Replicate a database.
* `application: application, app`: Manage design document applications.
* `local: local, lcl`: Manage local documents.
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
* `rc: runconf, rc`: Runtime configuration.

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
* `-g, --glob [pattern...]`: File match pattern(s).
* `--recursive`: Read directories recursively.
* `--destination [url]`: Copy destination.
* `--force`: Force file overwrite.
* `--ddoc [name]`: Design document id.
* `nm:-n, --name [name]`: Design document function name (view|update|show|list).
* `--feed [type]`: Poll feed type. 
* `--http`: Enable HTTP logs.

<!--- command definitions -->

### Docs

Commands for pushing and pulling bulk documents.

#### Commands

* `ls: ls`: List file system documents.
* `push: push`: Push a directory of JSON documents.

### Application

Commands for managing applications (design documents).

If no subcommand is specified `ls` is invoked.

#### Commands

* `ls: ls`: List design documents.
* `push: push`: Push a design document.
* `deploy: deploy`: Deploy views in live environment.
* `get: get`: Get a design document.
* `info: info`: Get design document information.
* `cp: cp`: Copy a design document.
* `head: head`: Get minimal design document information.
* `attach: attach, att`: Attachment commands for design documents.
* `view: view`: Query a design document view.
* `update: update`: Put a design document update.
* `show: show`: Show a document.
* `list: list`: Run a list function on a view.
* `rewrite: rewrite`: Run a rewrite rule path.
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
* `rm: rm`: Remove a database.
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
* `up: up`: Upload an attachment.
* `dl: dl`: Download an attachment.
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

### Rc

Runtime configuration is provided by JSON files named `.rlxrc`.

The `${cmd_init_long}` command when invoked with no arguments will copy the system rc file to the user directory `~/.rlx` otherwise if an output directory is specified it is copied to the target directory.

If no subcommand is specified `print` is invoked.

#### Commands

* `init: init`: Copy system rc file.
* `ls: ls`: List rc files.
* `print: print, p`: Print configuration.
* `get: get`: Get configuration property.
* `set: set`: Set configuration property.
* `rm: rm`: Remove configuration property.
* `dir: dir`: Print rc file search path.

#### Options

* `--search-path [dir...]`: Append directories to the rc search path.
* `-l, --long`: Long listing, include file contents.

### Template

These commands operate on two types of template, `file templates` that correspond to a single file and may be parsed to produce a JSON document using variables declared on the command line and `application templates` which are directories that are collated to a design document. For more information on application templates run `${cmd_help_long} ${cmd_application_short}`.

Templates may be referenced using the `${opt_template_pipe}` option (or the first additional argument), the value may be a file system path or reference to lookup in the search path. Short references are relative to the template directory and may or may not include the file extension.

For commands that accept a template (${cmd_init_long}, ${cmd_print_long} and ${cmd_parse_long}) file system paths are resolved first before looking in the template search path. In the case of `${cmd_init_long}` the template is used as the source for the copy operation. For other commands if a file is located it is treated as a template (and parsed in the case of the `${cmd_parse_long}` command), if a directory is located it is collated as if it were an application template.


To refer to a file template in the search path specify the relative path, eg: `user/new`, to reference an application prefix the template name with `design/`, eg: `design/minimal`.

Template references are resolved by first searching the user template directory and then the system template directory. You can modify these search paths with `${opt_system_long}`, `${opt_user_long}` and `${opt_search_path_help}` options, see `FILES` for more information.

If no subcommand is specified `ls` is invoked.

#### Commands

* `init: init`: Copy templates.
* `ls: ls`: List template files.
* `print: print, p`: Print template.
* `parse: parse`: Parse template and print result.
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

Variables are declared with an `@` symbol and must include an assignment operator (`=`). For example, `@foo=bar` will set the template variable named `foo` to the string `bar`.

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

## Environment

The `\$HOME` environment variable must be set in order for user configuration data to be loaded, typically for most developer environments this is not an issue however when using `$0(1)` as part of infrastructure deployment you may need to ensure that `\$HOME` is set.

## History

This program was originally implemented in bash shell script, see https://github.com/freeformsystems/rlx-shell.

Bash was chosen for ease of readline integration and the ability to concisely pipe between programs amongst other features. However implementing a complex program in shell script is non-trivial and it needed to rely on external languages for JSON support.

The original implementation whilst almost feature complete was deprecated in favour of a pure javascript version. In addition the original implementation started from a pure interactive REPL perspective with a view to implementing non-interactive support later - it never happened.

For the javascript program an inverse approach is taken, the REPL is the last feature to be implemented.
