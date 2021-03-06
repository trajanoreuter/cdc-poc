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

Note: You can configure more initial tables changing the file
`https://github.com/trajanoreuter/cdc-poc/blob/main/postgres/queries/create-table.sql`

### Remove all docker images and volumes
```
make purge-all
```