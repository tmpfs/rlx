## Developer

### Test

Tests require a clean [couchdb][] installation running in *admin party* mode.

```
npm test
```

Developed against `couchdb@1.6.0`, behaviour in earlier versions is undefined.

#### Environment

* `rlx_test_server` - Specify the server to run tests against, default is `http://localhost:5984`.

### Manual

To generate man pages run:

```
npm run manual
```

Generated man pages are in the [man][man] directory.

To dynamically generate man pages set `NODE_ENV` to `devel` and execute a help command:

```
NODE_ENV=devel ./bin/rlx help db
```

### Readme

To build the readme file from the partial definitions:

```
npm run readme
```
