#!/usr/bin/env sh

curl -X PUT http://localhost:5984/_config/couchdb/os_process_timeout \
  -H 'Content-Type: application/json' \
  -d '"30000"'

