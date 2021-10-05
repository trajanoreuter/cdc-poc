#!/bin/bash

cat ./scripts/sql-server/bootstrap.sql | docker exec -it sqlserver bash -c '/opt/mssql-tools/bin/sqlcmd -U sa -P P@ssw0rd'