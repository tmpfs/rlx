$0
==

Command line interface for couchdb.

## Commands

* `info: info`: Print server information.
* `stats: stats`: Print server statistics.
* `uuids: uuids`: Print list of uuids.
* `database: database, db`: Manage databases.
* `tasks: tasks`: Print active tasks. 
* `log: log`: Print server log. 
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

## Options

* `-s, --server [url]`: Database server.
* `-d, --database [name]`: Database name.
* `-u, --username [name]`: Authentication username.
* `-p, --password [pass]`: Authentication password.
* `-o, --output [file]`: Write response to output file.
* `-f, --file [file]`: Read JSON input from file.
* `-j, --json [json]`: JSON string literal (overrides --file).
* `-t, --template [name]`: The name of a template file.
* `--id [id]`: Document identifier.
* `--rev [rev]`: Document revision.

### Database

Commands for creating, deleting and modifying databases.

#### Commands

* `info: info`: Get database information.
* `exists: exists`: Check database existence.
* `add: add`: Create a database.
* `rm: rm`: Remove a database.
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

#### Commands

* `get: get`: Get administrator list.
* `set: set`: Create an administrator.
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

* `rev: rev`: Get a document revision.
