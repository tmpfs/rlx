## rlx cheatsheet

### GET /

Get server meta information:

```
rlx info -s http://localhost:5984
```

### GET /_active_tasks

Get active tasks:

```
rlx tasks -s http://localhost:5984
```

### GET /_db_updates

Get database updates:

```
rlx updates -s http://localhost:5984
```

### GET /_log

Tail log file:

```
rlx log -s http://localhost:5984
```

### POST /_replicate

Replicate a database:

```
rlx repl -s http://localhost:5984
```

### POST /_restart

Restart the server:

```
rlx restart -s http://localhost:5984
```

### GET /_stats

Get server statistics:

```
rlx stats -s http://localhost:5984
```

### GET /_uuids

Get uuids:

```
rlx uuids -s http://localhost:5984
```

### PUT /_config/{section}/{key}

Set server configuration value:

```
rlx conf set mock-config-section mock-config-key mock-config-value -s http://localhost:5984
```

### GET /_config

Get server configuration:

```
rlx conf -s http://localhost:5984
```

### GET /_config/{section}

Get server configuration section:

```
rlx conf get mock-config-section -s http://localhost:5984
```

### GET /_config/{section}/{key}

Get server configuration value:

```
rlx conf get mock-config-section mock-config-key -s http://localhost:5984
```

### DELETE /_config/{section}/{key}

Delete server configuration value:

```
rlx conf rm mock-config-section mock-config-key -s http://localhost:5984
```

### GET /_config/log/level

Get server log level:

```
rlx level -s http://localhost:5984
```

### PUT /_config/log/level

Set server log level to none:

```
rlx level none -s http://localhost:5984
```

### PUT /_config/log/level

Set server log level to error:

```
rlx level error -s http://localhost:5984
```

### PUT /_config/log/level

Set server log level to warning:

```
rlx level warn -s http://localhost:5984
```

### PUT /_config/log/level

Set server log level to debug:

```
rlx level debug -s http://localhost:5984
```

### PUT /_config/log/level

Set server log level to info:

```
rlx level info -s http://localhost:5984
```

### PUT /_config/admins/{key}

Add an administrator:

```
rlx admin add mock-admin secret -s http://localhost:5984
```

### GET /_config/admins

List administrators:

```
rlx admin ls -u mock-admin -p secret -s http://localhost:5984
```

### GET /_config/admins/{key}

Get an administrator:

```
rlx admin get mock-admin -u mock-admin -p secret -s http://localhost:5984
```

### DELETE /_config/admins/{key}

Remove an administrator:

```
rlx admin rm mock-admin -u mock-admin -p secret -s http://localhost:5984
```

### PUT /{db}

Create a database:

```
rlx db add -s http://localhost:5984 -d mock/database
```

### GET /_all_dbs

List databases:

```
rlx db ls -s http://localhost:5984
```

### GET /{db}

Get database changes:

```
rlx db changes -s http://localhost:5984 -d mock/database
```

### POST /{db}

Clean view indices:

```
rlx db cleanup -s http://localhost:5984 -d mock/database
```

### POST /{db}

Ensure full commit:

```
rlx db commit -s http://localhost:5984 -d mock/database
```

### POST /{db}

Compact database:

```
rlx db compact -s http://localhost:5984 -d mock/database
```

### POST /{db}

Compact database design document:

```
rlx db compact -s http://localhost:5984 -d _users --ddoc _auth
```

### HEAD /{db}

Check database existence:

```
rlx db exists -s http://localhost:5984 -d mock/database
```

### GET /{db}

Get database meta information:

```
rlx db info -s http://localhost:5984 -d mock/database
```

### GET /{db}

Get database revisions limit:

```
rlx db limit -s http://localhost:5984 -d mock/database
```

### PUT /{db}

Set database revisions limit:

```
rlx db limit -s http://localhost:5984 -d mock/database 1000
```

### DELETE /{db}

Remove database:

```
rlx db rm -s http://localhost:5984 -d mock/database
```

