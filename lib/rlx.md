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

## Options

* `-s, --server [url]`: Database server.
* `-o, --output [file]`: Write response to output file.

### Database

Commands for listing, creating and deleting databases.

#### Commands

* `ls: ls`: List databases.
* `add: add`: Create a database.
* `rm: rm`: Remove a database.

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
