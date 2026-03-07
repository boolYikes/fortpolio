const e=`---\r
name: Yet Another Todo App (Sealy)\r
date: 2026-03-04\r
tags: [python, fastapi, alembic, sqlalchemy, pydantic, gql, reactnative]\r
summary: (WIP) Todo app with FastAPI + React Native\r
---\r
\r
![Sealy CI](https://github.com/boolYikes/sealy/actions/workflows/main.yaml/badge.svg?branch=main)\r
\r
## Yet Another Todo App\r
\r
We don't want anything slipping through the cracks!<br>\r
Through meticulousness, you gain clarity.<br>\r
Through clarity, you gain productivity,<br>\r
Through productivity, you gain ...bullet points,<br>\r
Through bullet points, you get a job!<br>\r
\r
## DB Design\r
\r
![ERD](/fortpolio/md-images/boolYikes_sealy/todos_erd_v5.svg)\r
\r
1. Indexing\r
   - Index the search target table not the source\r
2. Access patterns > theoretical purity\r
   - most frequented queries? -> optimize specifically for that. Analyze traffic\r
   - done with pre-join, materialized views, small denormalization\r
3. Connection management\r
   - use connection pool. don't open a new db connection **per request!**\r
4. Query count per request\r
   - one request should be 1 to 3 queries not ten something queries (worst case db latency 10ms -> must be < 200ms according to SLO)\r
   - no looped queries! let the query do the job\r
\r
### Project structure\r
- \`db\` for db models, \`schemas\` for pydantic api shape\r
- \`sealy\` for source code, \`tests\` for tests\r
\r
### Note\r
- **Run migration tests on a fresh DB, not reused one**\r
- Keep schema tests read-only\r
- API tests should treat DB as a black box\r
   - Use markers e.g.,:\r
	- @pytest.mark.integration\r
	- @pytest.mark.api\r
- **Model change -> gen revision -> inspect/mod revision -> upgrade**\r
- **Reset and clean up migrations before prod**\r
- **Include \`op.execute("CREATE EXTENSION IF NOT EXISTS citext")\` in the init migration**\r
- **Alembic only generates enum for op.create_table() not op.execute() -> explicitly create types in revisions**\r
- Export dev env before alembic/pytest commands\r
\r
### TODO\r
- Drop unnecessary ids\r
- JWT + argon2 pw hashing\r
- token refresh\r
- Errors\r
- Firebase messaging -> push\r
- Indexes\r
- Make notes for future revision, clean up revision, re-init on prod\r
\r
### Non-negotiables\r
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
- **API versioning**
`;export{e as default};
