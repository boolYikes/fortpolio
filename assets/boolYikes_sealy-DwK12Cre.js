const e=`---\r
name: Yet Another Todo App (Sealy)\r
date: 2026-03-17\r
tags: [python, fastapi, alembic, sqlalchemy, pydantic, gql, reactnative]\r
summary: (WIP) Todo app with FastAPI + React Native\r
---\r
\r
\r
# Yet Another Todo App\r
![Sealy CI](https://github.com/boolYikes/sealy/actions/workflows/main.yaml/badge.svg?branch=main)\r
![Coverage](https://codecov.io/gh/boolYikes/sealy/branch/main/graph/badge.svg)\r
\r
A backend-focused todo management system built to explore **reliable database design**, **migration safety**, and **Change Data Capture (CDC) pipelines**.\r
\r
The project uses a mobile client (React Native) and a Python backend with PostgreSQL.  \r
Implementing **data consistency, migration safety, and event-driven CDC pipelines** on top of a well-tested relational model is the primary goal of this project.\r
\r
## Overview\r
This project implements a backend architecture with a strong emphasis on:\r
- relational data modeling\r
- migration safety\r
- repository patterns\r
- transactional integrity\r
- database-driven testing\r
\r
Future milestones will introduce:\r
- API backend\r
- Change Data Capture pipeline\r
- Client integration\r
\r
in that order of implementation.\r
\r
## Tech Stack\r
Backend\r
- Python\r
- SQLAlchemy\r
- PostgreSQL\r
- Alembic\r
- Pytest\r
\r
Infrastructure (so far)\r
- Docker\r
- GitHub Actions\r
\r
Client\r
- React Native (planned)\r
\r
CDC Pipeline\r
- PostgreSQL WAL and logical decoding/replication (planned)\r
- CDC connector (TBD: most likely Debezium)\r
- Event Streaming Platform (TBD: most likely Kafka)\r
\r
## DB Design\r
![ERD](/fortpolio/md-images/boolYikes_sealy/todos_erd_v5.svg)\r
\r
\r
Key design considerations:\r
\r
- query-driven schema design\r
- indexed access paths for frequent queries\r
- limited denormalization for performance\r
- transaction safety and predictable migrations\r
\r
## Architecture (Planned)\r
\`\`\`plaintext\r
Client | React Native App\r
\r
Backend | API Layer ➡️ Repository Layer ➡️ SQLAlchemy ORM ➡️ PostgreSQL\r
\r
Data Pipeline | CDC (Logical Replication) ➡️ Event Stream / Consumers\r
\`\`\`\r
\r
## Project structure (So far)\r
\`\`\`\r
.\r
├── alembic/\r
├── alembic.ini\r
├── Dockerfile\r
├── pyproject.toml\r
├── sealy/\r
│   ├── api/\r
│   ├── core/\r
│   ├── db/\r
│   ├── schemas/\r
│   ├── static/\r
│   └── main.py\r
└── tests/\r
\`\`\`\r
\r
## Development Setup\r
- Python 3.12\r
- PostgreSQL 16\r
- Docker 29.2.1\r
- Clone the repository, \r
- Create a virtual environment (\`python -m venv .venv\` or similar)\r
- Install dependencies: \`pip install -e .\`\r
- Export dev db environ before alembic/pytest commands on local tests e.g., \`PG_TEST_URL=... pytest\`\r
\r
<br>\r
\r
## Roadmap\r
\r
### Milestone 1 - Database layer (in progress)\r
This milestone focuses on building a **reliable database layer**.\r
- [x] Test environment setup\r
- [x] ORM models tests\r
- [x] Migration tests\r
- [ ] Repository/queries tests\r
- [ ] Transaction handling tests\r
\r
Test coverage includes(So far):\r
\r
| Area | Purpose |\r
|-----|------|\r
| DB setup tests | Ensure environment safety and isolation |\r
| ORM model validation | Ensure schema constraints match application models |\r
| Migration tests | Validate forward-only migrations |\r
| Repository tests | Verify query correctness |\r
| Transaction tests | Guarantee rollback / commit behavior |\r
\r
### Milestone 2 - API Layer\r
- authentication\r
- request validation\r
- error handling\r
- API versioning\r
\r
### Milestone 3 - CDC Pipeline\r
- replication\r
- event stream processing\r
- downstream consumers\r
\r
### Milestone 4 - Client\r
\r
## Engineering Notes\r
\r
<details>\r
<summary>Notes</summary>\r
\r
- Index the search target table not the source\r
- most frequented queries? -> optimize specifically for that. Analyze traffic\r
- done with pre-join, materialized views, small denormalization\r
- use connection pool. don't open a new db connection **per request!**\r
- one request should be 1 to 3 queries not ten something queries (worst case db latency 10ms -> must be < 200ms according to SLO)\r
- no looped queries! let the query do the job\r
- API tests should treat DB as a black box: e.g., \`@pytest.mark.integration\`, \`@pytest.mark.api\`\r
- **Always proof-read and edit alembic script manually after revision! e.g., add extension, create enum explictly, etc...**\r
- **Non-negotiables**\r
  - **Clear README (setup, usage, architecture)**\r
  - **Environ, secrets**\r
  - **Structured logging**\r
  - **Error handling**\r
  - **Dockerize**\r
  - **More tests**\r
  - **Config separation (dev/prod)**\r
  - **CI pipeline (GitHub Actions)**\r
  - **Database migrations**\r
  - **Health checks**\r
  - **Monitoring hooks**\r
  - **Realistic data volumes**\r
  - **API versioning**\r
- Diary?\r
  - ORM tries to null FK before deleting a related row when using \`session.delete()\` -> use \`passive_deletes="all"\` in relationships of parent collections to disable this behavior\r
\r
</details>\r
\r
<details>\r
<summary>Todos</summary>\r
\r
- Drop unnecessary ids\r
- JWT + argon2 pw hashing\r
- token refresh\r
- Errors\r
- Firebase messaging -> push\r
- Indexes\r
- Make notes for future revision, clean up revision, re-init on prod\r
\r
</details>\r
`;export{e as default};
