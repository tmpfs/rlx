Table of Contents
=================

* [rlx(1) cheatsheet](#rlx1-cheatsheet)
  * [Server](#server)
    * [GET /](#get-)
    * [GET /_active_tasks](#get-_active_tasks)
    * [~~GET /_db_updates~~](#get-_db_updates)
    * [GET /_log](#get-_log)
    * [~~POST /_replicate~~](#post-_replicate)
    * [POST /_restart](#post-_restart)
    * [GET /_stats](#get-_stats)
    * [GET /_uuids](#get-_uuids)
  * [Configuration](#configuration)
    * [PUT /_config/{section}/{key}](#put-_configsectionkey)
    * [GET /_config](#get-_config)
    * [GET /_config/{section}](#get-_configsection)
    * [GET /_config/{section}/{key}](#get-_configsectionkey)
    * [DELETE /_config/{section}/{key}](#delete-_configsectionkey)
  * [Log Level](#log-level)
    * [GET /_config/log/level](#get-_configloglevel)
    * [PUT /_config/log/level (none)](#put-_configloglevel-none)
    * [PUT /_config/log/level (error)](#put-_configloglevel-error)
    * [PUT /_config/log/level (warning)](#put-_configloglevel-warning)
    * [PUT /_config/log/level (debug)](#put-_configloglevel-debug)
    * [PUT /_config/log/level (info)](#put-_configloglevel-info)
  * [Administrators](#administrators)
    * [PUT /_config/admins/{key}](#put-_configadminskey)
    * [GET /_config/admins](#get-_configadmins)
    * [GET /_config/admins/{key}](#get-_configadminskey)
    * [DELETE /_config/admins/{key}](#delete-_configadminskey)
  * [Database](#database)
    * [PUT /{db}](#put-db)
    * [GET /_all_dbs](#get-_all_dbs)
    * [~~POST /{db}/_bulk_docs~~](#post-db_bulk_docs)
    * [~~POST /{db}/_temp_view~~](#post-db_temp_view)
    * [~~POST /{db}/_purge~~](#post-db_purge)
    * [~~POST /{db}/_missing_revs~~](#post-db_missing_revs)
    * [~~POST /{db}/_revs_diff~~](#post-db_revs_diff)
    * [GET /{db}/_changes](#get-db_changes)
    * [POST /{db}/_view_cleanup](#post-db_view_cleanup)
    * [POST /{db}/_ensure_full_commit](#post-db_ensure_full_commit)
    * [POST /{db}/_compact](#post-db_compact)
    * [POST /{db}/_compact/{ddoc}](#post-db_compactddoc)
    * [HEAD /{db}](#head-db)
    * [GET /{db}](#get-db)
    * [GET /{db}/_revs_limit](#get-db_revs_limit)
    * [PUT /{db}/_revs_limit](#put-db_revs_limit)
    * [DELETE /{db}](#delete-db)
  * [Security](#security)
    * [PUT /{db}/_security](#put-db_security)
    * [GET /{db}/_security](#get-db_security)
    * [PUT /{db}/_security](#put-db_security-1)
  * [Session](#session)
    * [POST /{db}/_session](#post-db_session)
    * [GET /{db}/_session](#get-db_session)
    * [DELETE /{db}/_session](#delete-db_session)

rlx(1) cheatsheet
=================

API methods yet to be implemented are marked with a strikethrough.

## Server

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

### ~~GET /_db_updates~~

Get database updates.

Documentation: [server/common#get-db-updates](http://docs.couchdb.org/en/latest/api/server/common.html#get--_db_updates)

### GET /_log

Tail log file:

```
rlx log -s {server}
```

Documentation: [server/common#get-log](http://docs.couchdb.org/en/latest/api/server/common.html#get--_log)

### ~~POST /_replicate~~

Replicate a database.

Documentation: [server/common#post-replicate](http://docs.couchdb.org/en/latest/api/server/common.html#post--_replicate)

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

## Configuration

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

## Log Level

### GET /_config/log/level

Get server log level:

```
rlx level -s {server}
```

Documentation: [server/configuration#get-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#get--_config-section-key)

### PUT /_config/log/level (none)

Set server log level to none:

```
rlx level none -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### PUT /_config/log/level (error)

Set server log level to error:

```
rlx level error -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### PUT /_config/log/level (warning)

Set server log level to warning:

```
rlx level warn -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### PUT /_config/log/level (debug)

Set server log level to debug:

```
rlx level debug -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

### PUT /_config/log/level (info)

Set server log level to info:

```
rlx level info -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

## Administrators

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

## Database

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

### ~~POST /{db}/_bulk_docs~~

Bulk document modifications.

Documentation: [database/bulk-api#post-db-bulk-docs](http://docs.couchdb.org/en/latest/api/database/bulk-api.html#post--db-_bulk_docs)

### ~~POST /{db}/_temp_view~~

Temporary view execution.

Documentation: [database/temp-views#post-db-temp-view](http://docs.couchdb.org/en/latest/api/database/temp-views.html#post--db-_temp_view)

### ~~POST /{db}/_purge~~

Purge documents.

Documentation: [database/misc#post-db-purge](http://docs.couchdb.org/en/latest/api/database/misc.html#post--db-_purge)

### ~~POST /{db}/_missing_revs~~

Find document revisions that do not exist.

Documentation: [database/misc#post-db-missing-revs](http://docs.couchdb.org/en/latest/api/database/misc.html#post--db-_missing_revs)

### ~~POST /{db}/_revs_diff~~

Get document revision diff.

Documentation: [database/misc#post-db-revs-diff](http://docs.couchdb.org/en/latest/api/database/misc.html#post--db-_revs_diff)

### GET /{db}/_changes

Get database changes:

```
rlx db changes -s {server} -d {db}
```

Documentation: [database/changes#get-db-changes](http://docs.couchdb.org/en/latest/api/database/changes.html#get--db-_changes)

### POST /{db}/_view_cleanup

Clean view indices:

```
rlx db cleanup -s {server} -d {db}
```

Documentation: [database/compact#post-db-view-cleanup](http://docs.couchdb.org/en/latest/api/database/compact.html#post--db-_view_cleanup)

### POST /{db}/_ensure_full_commit

Ensure full commit:

```
rlx db commit -s {server} -d {db}
```

Documentation: [database/compact#post-db-ensure-full-commit](http://docs.couchdb.org/en/latest/api/database/compact.html#post--db-_ensure_full_commit)

### POST /{db}/_compact

Compact database:

```
rlx db compact -s {server} -d {db}
```

Documentation: [database/compact#post-db-compact](http://docs.couchdb.org/en/latest/api/database/compact.html#post--db-_compact)

### POST /{db}/_compact/{ddoc}

Compact database design document:

```
rlx db compact -s {server} -d {db} --ddoc {ddoc}
```

Documentation: [database/compact#post-db-compact-ddoc](http://docs.couchdb.org/en/latest/api/database/compact.html#post--db-_compact-ddoc)

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

Documentation: [database/misc#get-db-revs-limit](http://docs.couchdb.org/en/latest/api/database/misc.html#get--db-_revs_limit)

### PUT /{db}/_revs_limit

Set database revisions limit:

```
rlx db limit -s {server} -d {db} 1000
```

Documentation: [database/misc#put-db-revs-limit](http://docs.couchdb.org/en/latest/api/database/misc.html#put--db-_revs_limit)

### DELETE /{db}

Remove database:

```
rlx db rm -s {server} -d {db}
```

Documentation: [database/common#delete-db](http://docs.couchdb.org/en/latest/api/database/common.html#delete--db)

## Security

### PUT /{db}/_security

Set security document:

```
rlx security set -s {server} -d {db} --file {file}
```

Documentation: [database/security#put-db-security](http://docs.couchdb.org/en/latest/api/database/security.html#put--db-_security)

### GET /{db}/_security

Get security document:

```
rlx security get -s {server} -d {db}
```

Documentation: [database/security#get-db-security](http://docs.couchdb.org/en/latest/api/database/security.html#get--db-_security)

### PUT /{db}/_security

Reset security document:

```
rlx security rm -s {server} -d {db}
```

Documentation: [database/security#put-db-security](http://docs.couchdb.org/en/latest/api/database/security.html#put--db-_security)

## Session

### POST /{db}/_session

Login with cookie authentication:

```
rlx session set -u {username} -p {password} -s {server}
```

Documentation: [server/authn#post-session](http://docs.couchdb.org/en/latest/api/server/authn.html#post--_session)

### GET /{db}/_session

Get user session:

```
rlx session get -u {username} -p {password} -s {server}
```

Documentation: [server/authn#get-session](http://docs.couchdb.org/en/latest/api/server/authn.html#get--_session)

### DELETE /{db}/_session

Logout of authenticated session:

```
rlx session rm -u {username} -p {password} -s {server}
```

Documentation: [server/authn#delete-session](http://docs.couchdb.org/en/latest/api/server/authn.html#delete--_session)

Generated by [mdp(1)](https://github.com/freeformsystems/mdp).

