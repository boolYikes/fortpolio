const n=`---
name: City Pulse
date: 2026-04-10
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

### Data Contract

**Forecast - semi-structured**

- This dataset is optimized for retrieval, not analytics (JSON storage is intentional)
- Forecasts should always reflect the latest available data
- This table is used for caching identical requests within a given time window
- Data is not durable and may be overwritten or expired
- Historical lookup is best-effort and not guaranteed complete
- Cache key: city + request_time

\`\`\`json
{
  "city": "string",
  "state": "string",
  "sunrise": "datetime (UTC offset)",
  "sunset":  "datetime (UTC offset)",
  "timezone": "string (IANA ID)",
  "updated_at":  "datetime (UTC offset)",
  "forecast": [
    {
      "detailedForecast": "string",
      "startTime": "datetime (UTC offset)",
      "endTime": "datetime (UTC offset)",
      "icon": "string (url)",
      "isDaytime": "boolean",
      "name": "string",
      "number": "integer",
      "probabilityOfPrecipitation": {
          "unitCode": "string (wmoUnit:<code>)",
          "value": "integer"
      },
      "shortForecast": "string",
      "temperature": "integer | float",
      "temperatureTrend": "optional",
      "temperatureUnit": "string",
      "windDirection": "string",
      "windSpeed": "string"
    }
  ]
}
\`\`\`

**Air Quality - silver**

- Partitioning is stable, in Parquet format and does not change over time

| column     | role          | partitioned | data type |
|--------    |---------------|-------------|-----------|
| city       | dimension     | yes         | string    |
| date       | dimension     | yes         | datetime  |
| pollutant  | dimension     | no          | string    |
| value      | measurement   | no          | float     |

Dimension table: Pollutant, snapshot strategy

| column       | data type |
| -            | -         |
| name         | string    |
| display_name | string    | 
| interval     | integer   |
| units        | string    |

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

- [x] Implemented retry logic to OpenAQ so it covers the cases where some sensors are late on updates, by going back in time with 1 hour step, 
- [ ] Use If-None-Match systax in s3 client

</details>
`;export{n as default};
