---
name: Yet Another Todo App (Sealy)
date: 2026-03-04
tags: [python, fastapi, alembic, sqlalchemy, pydantic, gql, reactnative]
summary: (WIP) Todo app with FastAPI + React Native
---

![Sealy CI](https://github.com/boolYikes/sealy/actions/workflows/main.yaml/badge.svg?branch=main)

## Yet Another Todo App

We don't want anything slipping through the cracks!
Through meticulousness, you gain clarity.
Through clarity, you gain productivity,
Through productivity, you gain ...bullet points,
Through bullet points, you get a job!

## Infra
- FastAPI
### API Hosting
- Google Cloud Run: scales to zero on idle, cheap, handle quite a lot of reqs
- Google Compute Engine
- Cloudflare
### DB Hostings
- Run it on the same VM as API (warning, hands-on)
- Or use managed (expensive)
### Logging and Metrics
- Measure queries per endpoints

## DB Design

![ERD](./boolYikes_sealy/todos_erd_v5.svg)

1. Schema design
   - correct pk
   - proper fk
   - avoid unncessary joins
   - don't over-normalize
2. Indexing
   - Index the search target table not the source
3. Access patterns > theoretical purity
   - most frequented queries? -> optimize specifically for that. Analyze traffic
   - done with pre-join, materialized views, small denormalization
4. Connection management
   - use connection pool. don't open a new db connection **per request!**
5. Query count per request
   - one request should be 1 to 3 queries not ten something queries (worst case db latency 10ms -> must be < 200ms according to SLO)
   - no looped queries! let the query do the job

### Project structure
- `db` for db models, `schemas` for pydantic api shape
- `sealy` for source code, `tests` for tests

### Note
- **Run migration tests on a fresh DB, not reused one**
- Keep schema tests read-only
- API tests should treat DB as a black box
   - Use markers e.g.,:
	- @pytest.mark.integration
	- @pytest.mark.api
- **Model change -> gen revision -> inspect/mod revision -> upgrade**
- **Reset and clean up migrations before prod**
- **Include `op.execute("CREATE EXTENSION IF NOT EXISTS citext")` in the init migration**
- **Alembic only generates enum for op.create_table() not op.execute() -> explicitly create types in revisions**
- Export dev env before alembic/pytest commands

### TODO
- Drop unnecessary ids
- JWT + argon2 pw hashing
- token refresh
- Errors
- Firebase messaging -> push
- Indexes
- Make notes for future revision, clean up revision, re-init on prod

### Non-negotiables
- **Clear README (setup, usage, architecture)**
- **Environ, secrets**
- **Structured logging**
- **Error handling**
- **Dockerize**
- **More tests**
- **Config separation (dev/prod)**
- **CI pipeline (GitHub Actions)**
- **Database migrations**
- **Health checks**
- **Monitoring hooks**
- **Realistic data volumes**
- **API versioning**
