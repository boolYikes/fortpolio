#!/bin/bash

docker run -it --name fortpolio-postgres --rm -v fortpolio:/var/lib/postgresql/data -e POSTGRES_USER=fortpolio -e POSTGRES_PASSWORD=sdw5414 -e POSTGRES_DB=fortpolio -p 5433:5432 -d postgres:13
