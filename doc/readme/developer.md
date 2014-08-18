## Developer

### Test

Tests require a clean [couchdb][] installation running in *admin party* mode.

```
npm test
```

Developed against `couchdb@1.6.0`, behaviour in earlier versions is undefined.

### Manual

To generate man pages run:

```
npm run manual
```

Generated man pages are in the [man][man] directory.

To dynamically generate man pages set `NODE_ENV` to `devel` and execute a help command:

```
NODE_ENV=devel ./bin/sdk help db
```

### Readme

To build the readme file from the partial definitions:

```
npm run readme
```
