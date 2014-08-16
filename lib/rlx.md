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
* `login`: Login to a server.
* `logout`: Logout of current session.
* `list: list, ls`: List databases.
* `security: security, sec`: Get or set security document.

## Options

* `-s, --server [url]`: Database server.
* `-d, --database [name]`: Database name.
* `-u, --username [name]`: Authentication username.
* `-p, --password [pass]`: Authentication password.
* `-o, --output [file]`: Write response to output file.

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
