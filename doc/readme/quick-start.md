## Quick Start

Start [couchdb][] in it's default configuration, then run:

```
rlx i               # Launch interactive console
cd :lh              # Use alias to `cd http://localhost:5984`
db ls               # List databases
db add mydb         # Create database
cd mydb             # Use new database
doc add -i mydoc    # Create a new document
doc edit mydoc      # Edit document with `vim`
doc get mydoc       # Print modified and saved document
help                # Learn more commands in the manual
q                   # Quit interactive session
```
