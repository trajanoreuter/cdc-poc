# cdc-poc
CDC with Kafka, KSQL, akhq dashboard, schema registry, Debezium and Postgres

### How to run
```
make setup-all
```

### How to stop
```
make stop
```

### Access dashboard
```
localhost:8080
```

### Access KSQL
```
make ksql
```

### Access Postgres
```
make psql
```

### Configure Debezium
```
make setup-connectors
```

### Configure Postgres
```
make setup-db
```

### Remove all docker images and volumes
```
make purge-all
```

### How to populate tables with fake data
```
make populate-tables
```
This will generate 10 users with 10 random todo`s