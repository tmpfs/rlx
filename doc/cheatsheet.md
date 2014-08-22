## rlx(1) cheatsheet

### GET /

Get server meta information:

```
rlx info -s {server}
```

Documentation: [server/common#get](http://docs.couchdb.org/en/latest/api/server/common.html#get--)

### GET /_active_tasks

Get active tasks:

```
rlx tasks -s {server}
```

Documentation: [server/common#get-active-tasks](http://docs.couchdb.org/en/latest/api/server/common.html#get--_active_tasks)

### GET /_log

Tail log file:

```
rlx log -s {server}
```

Documentation: [server/common#get-log](http://docs.couchdb.org/en/latest/api/server/common.html#get--_log)

### POST /_restart

Restart the server:

```
rlx restart -s {server}
```

Documentation: [server/common#post-restart](http://docs.couchdb.org/en/latest/api/server/common.html#post--_restart)

### GET /_stats

Get server statistics:

```
rlx stats -s {server}
```

Documentation: [server/common#get-stats](http://docs.couchdb.org/en/latest/api/server/common.html#get--_stats)

### GET /_uuids

Get uuids:

```
rlx uuids -s {server}
```

Documentation: [server/common#get-uuids](http://docs.couchdb.org/en/latest/api/server/common.html#get--_uuids)

### PUT /_config/{section}/{key}

Set server configuration value:

```
rlx conf set {section} {key} {value} -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### GET /_config

Get server configuration:

```
rlx conf -s {server}
```

Documentation: [server/configuration#get-config](http://docs.couchdb.org/en/latest/api/server/configuration.html#get--_config)

### GET /_config/{section}

Get server configuration section:

```
rlx conf get {section} -s {server}
```

Documentation: [server/configuration#get-config-section](http://docs.couchdb.org/en/latest/api/server/configuration.html#get--_config-section)

### GET /_config/{section}/{key}

Get server configuration value:

```
rlx conf get {section} {key} -s {server}
```

Documentation: [server/configuration#get-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#get--_config-section-key)

### DELETE /_config/{section}/{key}

Delete server configuration value:

```
rlx conf rm {section} {key} -s {server}
```

Documentation: [server/configuration#delete-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#delete--_config-section-key)

### GET /_config/log/level

Get server log level:

```
rlx level -s {server}
```

Documentation: [server/configuration#get-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#get--_config-section-key)

### PUT /_config/log/level

Set server log level to none:

```
rlx level none -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### PUT /_config/log/level

Set server log level to error:

```
rlx level error -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### PUT /_config/log/level

Set server log level to warning:

```
rlx level warn -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### PUT /_config/log/level

Set server log level to debug:

```
rlx level debug -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### PUT /_config/log/level

Set server log level to info:

```
rlx level info -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### PUT /_config/admins/{key}

Add an administrator:

```
rlx admin add {username} {password} -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### GET /_config/admins

List administrators:

```
rlx admin ls -u {username} -p {password} -s {server}
```

Documentation: [server/configuration#get-config-section](http://docs.couchdb.org/en/latest/api/server/configuration.html#get--_config-section)

### GET /_config/admins/{key}

Get an administrator:

```
rlx admin get {username} -u {username} -p {password} -s {server}
```

Documentation: [server/configuration#get-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#get--_config-section-key)

### DELETE /_config/admins/{key}

Remove an administrator:

```
rlx admin rm {username} -u {username} -p {password} -s {server}
```

Documentation: [server/configuration#delete-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#delete--_config-section-key)

### PUT /{db}

Create a database:

```
rlx db add -s {server} -d {db}
```

Documentation: [database/common#put-db](http://docs.couchdb.org/en/latest/api/database/common.html#put--db)

### GET /_all_dbs

List databases:

```
rlx db ls -s {server}
```

Documentation: [server/common#all-dbs](http://docs.couchdb.org/en/latest/api/server/common.html#all-dbs)

### GET /{db}/_changes

Get database changes:

```
rlx db changes -s {server} -d {db}
```

Documentation: [database/common#get-db-changes](http://docs.couchdb.org/en/latest/api/database/common.html#get--db-_changes)

### POST /{db}/_view_cleanup

Clean view indices:

```
rlx db cleanup -s {server} -d {db}
```

Documentation: [database/common#post-db-view-cleanup](http://docs.couchdb.org/en/latest/api/database/common.html#post--db-_view_cleanup)

### POST /{db}/_ensure_full_commit

Ensure full commit:

```
rlx db commit -s {server} -d {db}
```

Documentation: [database/common#post-db-ensure-full-commit](http://docs.couchdb.org/en/latest/api/database/common.html#post--db-_ensure_full_commit)

### POST /{db}/_compact

Compact database:

```
rlx db compact -s {server} -d {db}
```

Documentation: [database/common#post-db-compact](http://docs.couchdb.org/en/latest/api/database/common.html#post--db-_compact)

### POST /{db}/_compact/{ddoc}

Compact database design document:

```
rlx db compact -s {server} -d {db} --ddoc {ddoc}
```

Documentation: [database/common#post-db-compact-ddoc](http://docs.couchdb.org/en/latest/api/database/common.html#post--db-_compact-ddoc)

### HEAD /{db}

Check database existence:

```
rlx db exists -s {server} -d {db}
```

Documentation: [database/common#head-db](http://docs.couchdb.org/en/latest/api/database/common.html#head--db)

### GET /{db}

Get database meta information:

```
rlx db info -s {server} -d {db}
```

Documentation: [database/common#get-db](http://docs.couchdb.org/en/latest/api/database/common.html#get--db)

### GET /{db}/_revs_limit

Get database revisions limit:

```
rlx db limit -s {server} -d {db}
```

Documentation: [database/common#get-db-revs-limit](http://docs.couchdb.org/en/latest/api/database/common.html#get--db-_revs_limit)

### PUT /{db}/_revs_limit

Set database revisions limit:

```
rlx db limit -s {server} -d {db} 1000
```

Documentation: [database/common#put-db-revs-limit](http://docs.couchdb.org/en/latest/api/database/common.html#put--db-_revs_limit)

### DELETE /{db}

Remove database:

```
rlx db rm -s {server} -d {db}
```

Documentation: [database/common#delete-db](http://docs.couchdb.org/en/latest/api/database/common.html#delete--db)

