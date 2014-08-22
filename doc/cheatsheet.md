## rlx(1) cheatsheet

### GET /

Get server meta information:

```
rlx info -s {server}
```

### GET /_active_tasks

Get active tasks:

```
rlx tasks -s {server}
```

### GET /_log

Tail log file:

```
rlx log -s {server}
```

### POST /_restart

Restart the server:

```
rlx restart -s {server}
```

### GET /_stats

Get server statistics:

```
rlx stats -s {server}
```

### GET /_uuids

Get uuids:

```
rlx uuids -s {server}
```

### PUT /_config/{section}/{key}

Set server configuration value:

```
rlx conf set {section} {key} {value} -s {server}
```

### GET /_config

Get server configuration:

```
rlx conf -s {server}
```

### GET /_config/{section}

Get server configuration section:

```
rlx conf get {section} -s {server}
```

### GET /_config/{section}/{key}

Get server configuration value:

```
rlx conf get {section} {key} -s {server}
```

### DELETE /_config/{section}/{key}

Delete server configuration value:

```
rlx conf rm {section} {key} -s {server}
```

### GET /_config/log/level

Get server log level:

```
rlx level -s {server}
```

### PUT /_config/log/level

Set server log level to none:

```
rlx level none -s {server}
```

### PUT /_config/log/level

Set server log level to error:

```
rlx level error -s {server}
```

### PUT /_config/log/level

Set server log level to warning:

```
rlx level warn -s {server}
```

### PUT /_config/log/level

Set server log level to debug:

```
rlx level debug -s {server}
```

### PUT /_config/log/level

Set server log level to info:

```
rlx level info -s {server}
```

### PUT /_config/admins/{key}

Add an administrator:

```
rlx admin add {username} {password} -s {server}
```

### GET /_config/admins

List administrators:

```
rlx admin ls -u {username} -p {password} -s {server}
```

### GET /_config/admins/{key}

Get an administrator:

```
rlx admin get {username} -u {username} -p {password} -s {server}
```

### DELETE /_config/admins/{key}

Remove an administrator:

```
rlx admin rm {username} -u {username} -p {password} -s {server}
```

### PUT /{db}

Create a database:

```
rlx db add -s {server} -d {db}
```

### GET /_all_dbs

List databases:

```
rlx db ls -s {server}
```

### GET /{db}

Get database changes:

```
rlx db changes -s {server} -d {db}
```

### POST /{db}

Clean view indices:

```
rlx db cleanup -s {server} -d {db}
```

### POST /{db}

Ensure full commit:

```
rlx db commit -s {server} -d {db}
```

### POST /{db}

Compact database:

```
rlx db compact -s {server} -d {db}
```

### POST /{db}

Compact database design document:

```
rlx db compact -s {server} -d {db} --ddoc {ddoc}
```

### HEAD /{db}

Check database existence:

```
rlx db exists -s {server} -d {db}
```

### GET /{db}

Get database meta information:

```
rlx db info -s {server} -d {db}
```

### GET /{db}/_revs_limit

Get database revisions limit:

```
rlx db limit -s {server} -d {db}
```

### PUT /{db}/_revs_limit

Set database revisions limit:

```
rlx db limit -s {server} -d {db} 1000
```

### DELETE /{db}

Remove database:

```
rlx db rm -s {server} -d {db}
```

