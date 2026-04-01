const n=`---
name: City Pulse
date: 2026-03-31
tags: [python, aws]
summary: City info aggregator
---

# City Pulse
![CI](https://github.com/boolYikes/city-pulse/actions/workflows/main.yaml/badge.svg?branch=main)
![Coverage](https://codecov.io/gh/boolYikes/city-pulse/branch/main/graph/badge.svg)

## Overview

City Pulse orchestrates an event-driven ETL pipeline that aggregates and processes urban signals from multiple public sources
- Weather APIs
- Open APIs (government/public datasets)
- Crime data
- Local government news

### Data Pipeline


Pipeline flow:
1. EventBridge schedules and triggers ingestion workflows
2. Step Functions orchestrate ETL jobs across services
3. Lambda functions fetch, normalize, and transform incoming data
4. Processed data is stored in an S3-based lakehouse
5. Failures and alerts are propagated via SNS
6. Unrecoverable jobs are routed to SQS dead-letter queues

## Tech Stack

### Data Pipeline
- Event-driven architecture using AWS-native services
- EventBridge for scheduling and triggering workflows
- Step Functions for orchestration
- Lambda for ingestion and transformation
- S3 as the lakehouse storage layer

### Messaging & Reliability
- SNS for alerts (budget thresholds, failures, system notifications)
- SQS (DLQ) for handling non-retriable jobs Observability
- CloudWatch for logs and metrics visualization
- CloudTrail for auditing and event tracking
- Logs retention is intentionally limited (~1 week) to control costs

### Infrastructure
- CloudFormation for reproducible infrastructure deployment
- EC2 for hosting a lightweight web application for data visualization

## Data Modeling
![ERD](/fortpolio/md-images/boolYikes_city-pulse/#insert_image_path)

## Architecture
\`\`\`plaintext
EventBridge → triggers scheduled ingestion

Step Functions → orchestrates workflow
  → Lambda: fetch weather / open API / crime / news data
  → Lambda: transform and normalize data
  → Lambda: write to S3 lakehouse

Failures:
  → SNS notifications (alerts, budget warnings)
  → SQS DLQ for non-retriable events

Observability:
  → CloudWatch logs & metrics
  → CloudTrail audit logs

Serving:
  → EC2 web app reads from S3 and renders visualizations
\`\`\`

## Project structure
\`\`\`
# TBD
\`\`\`

## Development Setup

\`\`\`bash
python -m venv .venv
source .venv/bin/activate
pip install -e .[dev]
\`\`\`

## Roadmap

### Milestone 1 - Data pipeline

Development environment
- [x] Local PoC
- Observability setup

Planning
- Data schema
- Event contracts
- Retry / DLQ strategy

Implementation
- Pipeline components
- Ingestion (Lambda)
- Transformation
- Storage (S3 layout)
- Integration tests

Cloud Infra
- CloudFormation templates
- Deployment automation
- Monitoring & alerting setup

Deployment
- Staging
- Production

### Milestone 2 - Analytics / Insights
- Aggregations and derived datasets
- Alerting logic (city anomalies, trends)

### Milestone 3 - Client
- Web dashboard on EC2
- Visualization of time-series and events

## Engineering Notes

<details>

<summary>Notes</summary>

</details>

<details>

<summary>Todos</summary>

</details>
`;export{n as default};
