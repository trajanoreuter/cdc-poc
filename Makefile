setup-db:
	@docker-compose up -d postgres
.PHONY: setup-db

setup-kafka-ecosystem:
	@docker-compose up -d zookeeper broker schema-registry connect akhq ksqldb-server ksqldb-cli
.PHONY: setup-kafka-ecosystem

setup-connectors:
	@sleep 15
	./scripts/connectors/debezium.sh
.PHONY: setup-connectors

setup-all: setup-db setup-kafka-ecosystem setup-connectors
.PHONY: setup-all

psql:
	@docker-compose exec postgres psql user=postgres
.PHONY: psql

ksql:
	@docker exec -it ksqldb-cli ksql http://ksqldb-server:8088
.PHONY: ksql

stop:
	@docker-compose stop
.PHONY: stop

down:
	@docker-compose down
.PHONY: down

purge-all:
	@docker ps -aq | xargs docker stop
	@docker ps -aq | xargs docker rm
	@docker images -q | xargs docker rmi
.PHONY: purge-all
