Table of Contents
=================

* [rlx(1) cheatsheet](#rlx1-cheatsheet)
  * [Administrators](#administrators)
    * [PUT /_config/admins/{key}](#put-_configadminskey)
    * [GET /_config/admins](#get-_configadmins)
    * [GET /_config/admins/{key}](#get-_configadminskey)
    * [DELETE /_config/admins/{key}](#delete-_configadminskey)
  * [User](#user)
    * [PUT /_users/{docid}](#put-_usersdocid)
    * [GET /_users/_all_docs](#get-_users_all_docs)
    * [GET /_users/{docid}](#get-_usersdocid)
    * [DELETE /_users/{docid}](#delete-_usersdocid)
  * [Session](#session)
    * [POST /{db}/_session](#post-db_session)
    * [GET /{db}/_session](#get-db_session)
    * [DELETE /{db}/_session](#delete-db_session)
  * [Server](#server)
    * [GET /](#get-)
    * [GET /_active_tasks](#get-_active_tasks)
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
    * [GET /_db_updates](#get-_db_updates)
  * [Security](#security)
    * [PUT /{db}/_security](#put-db_security)
    * [GET /{db}/_security](#get-db_security)
  * [Document](#document)
    * [PUT /{db}/{docid}](#put-dbdocid)
    * [GET /{db}/{docid}](#get-dbdocid)
    * [GET /{db}/_all_docs](#get-db_all_docs)
    * [HEAD /{db}/{docid}](#head-dbdocid)
    * [DELETE /{db}/{docid}](#delete-dbdocid)
  * [Log Level](#log-level)
    * [GET /_config/log/level](#get-_configloglevel)
    * [PUT /_config/log/level](#put-_configloglevel)

rlx(1) cheatsheet
=================

API methods yet to be implemented are marked with a strikethrough.

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

## User

### PUT /_users/{docid}

Create or update a user:

```
rlx user add -s {server} @name={username} @password={password}
rlx user passwd -s {server} @name={username} @password={password}
```

Documentation: [document/common#put-db-docid](http://docs.couchdb.org/en/latest/api/document/common.html#put--db-docid)

### GET /_users/_all_docs

List users:

```
rlx user ls -s {server}
```

Documentation: [database/bulk-api#get-db-all-docs](http://docs.couchdb.org/en/latest/api/database/bulk-api.html#get--db-_all_docs)

### GET /_users/{docid}

Get a user:

```
rlx user get -s {server} @name={username}
```

Documentation: [document/common#get-db-docid](http://docs.couchdb.org/en/latest/api/document/common.html#get--db-docid)

### DELETE /_users/{docid}

Remove a user:

```
rlx user rm -s {server} @name={username}
```

Documentation: [document/common#delete-db-docid](http://docs.couchdb.org/en/latest/api/document/common.html#delete--db-docid)

## Session

### POST /{db}/_session

Login with cookie authentication:

```
rlx session set -u {username} -p {password} -s {server}
rlx login -u {username} -p {password} -s {server}
```

Documentation: [server/authn#post-session](http://docs.couchdb.org/en/latest/api/server/authn.html#post--_session)

### GET /{db}/_session

Get user session:

```
rlx session get -u {username} -p {password} -s {server}
rlx whoami -u {username} -p {password} -s {server}
```

Documentation: [server/authn#get-session](http://docs.couchdb.org/en/latest/api/server/authn.html#get--_session)

### DELETE /{db}/_session

Logout of authenticated session:

```
rlx session rm -u {username} -p {password} -s {server}
rlx logout -u {username} -p {password} -s {server}
```

Documentation: [server/authn#delete-session](http://docs.couchdb.org/en/latest/api/server/authn.html#delete--_session)

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

### GET /_db_updates

Get database updates:

```
rlx db updates -s {server} --feed longpoll
```

Documentation: [server/common#get-db-updates](http://docs.couchdb.org/en/latest/api/server/common.html#get--_db_updates)

## Security

### PUT /{db}/_security

Set security document:

```
rlx security set -s {server} -d {db} --file {file}
rlx security rm -s {server} -d {db}
```

Documentation: [database/security#put-db-security](http://docs.couchdb.org/en/latest/api/database/security.html#put--db-_security)

### GET /{db}/_security

Get security document:

```
rlx security get -s {server} -d {db}
```

Documentation: [database/security#get-db-security](http://docs.couchdb.org/en/latest/api/database/security.html#get--db-_security)

## Document

### PUT /{db}/{docid}

Create a document:

```
rlx doc add -s {server} -d {db} -t {template} --id {docid}
```

Documentation: [document/common#put-db-docid](http://docs.couchdb.org/en/latest/api/document/common.html#put--db-docid)

### GET /{db}/{docid}

Get a document:

```
rlx doc get -s {server} -d {db} --id {docid}
```

Documentation: [document/common#get-db-docid](http://docs.couchdb.org/en/latest/api/document/common.html#get--db-docid)

### GET /{db}/_all_docs

List documents:

```
rlx doc ls -s {server} -d {db}
```

Documentation: [database/bulk-api#get-db-all-docs](http://docs.couchdb.org/en/latest/api/database/bulk-api.html#get--db-_all_docs)

### HEAD /{db}/{docid}

Get document revision:

```
rlx doc head -s {server} -d {db} --id {docid}
rlx doc rev -s {server} -d {db} --id {docid}
```

Documentation: [document/common#head-db-docid](http://docs.couchdb.org/en/latest/api/document/common.html#head--db-docid)

### DELETE /{db}/{docid}

Remove a document:

```
rlx doc rm -s {server} -d {db} --id {docid}
```

Documentation: [document/common#delete-db-docid](http://docs.couchdb.org/en/latest/api/document/common.html#delete--db-docid)

## Log Level

### GET /_config/log/level

Get server log level:

```
rlx level -s {server}
```

Documentation: [server/configuration#get-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#get--_config-section-key)

### PUT /_config/log/level

Set server log level:

```
rlx level none -s {server}
rlx level error -s {server}
rlx level warn -s {server}
rlx level debug -s {server}
rlx level info -s {server}
```

Documentation: [server/configuration#put-config-section-key](http://docs.couchdb.org/en/latest/api/server/configuration.html#put--_config-section-key)

Generated by [mdp(1)](https://github.com/freeformsystems/mdp).

