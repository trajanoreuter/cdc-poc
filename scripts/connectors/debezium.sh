#!/bin/bash

curl -i -X POST \
    -H "Accept:application/json" \
    -H  "Content-Type:application/json" \
    http://localhost:8083/connectors/ -d '
    {
      "name": "debezium",
      "config": {
        "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
        "tasks.max": "1",
        "database.hostname": "postgres",
        "plugin.name": "wal2json",
        "database.port": "5432",
        "database.user": "postgres",
        "database.password": "postgres",
        "database.dbname": "postgres",
        "database.server.name": "test",
        "table.include.list": "public.Users, public.Todos",
        "database.history.kafka.bootstrap.servers": "http://broker:9092",
        "database.history.kafka.topic": "schema.changes.test.cdc",
        "include.schema.changes": "true",
        "slot.name": "debezium",
        "max.queue.size": "81290",
        "max.batch.size": "20480",
        "key.converter": "io.confluent.connect.avro.AvroConverter",
        "value.converter": "io.confluent.connect.avro.AvroConverter",
        "key.converter.schema.registry.url": "http://schema-registry:8081",
        "value.converter.schema.registry.url": "http://schema-registry:8081",
        "snapshot.mode": "exported"
      }
    }
    '
