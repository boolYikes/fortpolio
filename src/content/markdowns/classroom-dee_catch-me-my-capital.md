---
name: Catch Me My Capital
date: 2025-03-31
tags: [python, airflow, aws, spark, dbt, terraform, githubactions, docker]
summary: A financial data pipeline and backtesting platform designed to support rational investment decision-making.
---

# Catch Me My Capital

A financial data pipeline and backtesting platform designed to support rational investment decision-making.

### What it does
- Optimize portfolio management through integrated financial data visualization
- Build a structured ETL pipeline for systematic data processing and analysis
- Design a scalable AWS-based architecture
  - Serverless AWS services, data lakes, and data warehouse clusters
  - Automated workflows
- Generate insights by filtering diverse asset classes:
  - Stocks, bonds, ETFs, foreign exchange, and more
  - Interactive dashboards powered by Tableau
  - Custom filters and views for users

### Tech Stack
- **Data Collection & Processing**
  - Python (3.11), AWS Glue, dbt
  - Python Dependencies:
    - Backtesting: backtrader, quantstats
    - Data Collection: cloudscraper, requests, bs4, yfinance
- **Data Storage**
  - AWS S3, AWS Redshift, AWS RDS
- **Data Serving & Visualization**
  - Tableau (BI), AWS Lambda (API)
- **Orchestration**
  - AWS MWAA (Airflow 2.10.1)
- **Infrastructure & Operations**
  - Terraform (Infrastructure as Code)
  - GitHub Actions (CI/CD)
  - AWS CloudWatch (Monitoring)
- **Security**
  - AWS Secrets Manager, AWS VPC
- **Collaboration Tools**
  - Jira, Postman, GitHub, Slack, Discord
- **Local Development**
  - Docker + Airflow (2.10.1)

### Architecture
*Due to limited resources in Account B, the system is designed using two AWS accounts.*
- **Account A: Team3 (MWAA Dedicated Account)**
  - MWAA (Managed Workflows for Apache Airflow)
    - Easy to manage, scalable, and quick to deploy
    - Executes DAGs for data ingestion and pipeline orchestration

- **Account B: Devcourse (Data Processing & Storage Account)**
  - S3 (Data Lake)
    - Stores Bronze, Silver, Gold layers
    - Flexible storage for diverse data formats
  - AWS Glue
    - Serverless data processing using Spark
    - Components:
      - Crawlers: schema detection & catalog creation
      - ETL Jobs: data transformation
  - Amazon Redshift
    - Columnar storage and parallel processing
    - Scalable data warehouse for analytics
  - AWS Lambda
    - Auto-scaling, serverless compute
    - Handles API triggers and automation
  - Amazon RDS (+ ElastiCache)
    - API serving database
    - In-memory caching for fast response
  - AWS Secrets Manager
    - Secure credential storage
    - Integrated with Redshift and RDS
- **Cross-Account Integration**
  - IAM Role configuration:
    - MWAA service role (Account A) ↔ Glue role (Account B)
    - Trusted entity setup
    - Permissions for S3, Glue, Redshift, Secrets Manager

### Data Pipeline
*The pipeline follows a Medallion Architecture: Bronze → Silver → Gold.*
- Improves data quality progressively
- Enables clear data lineage tracking
- Separates transformation logic by layer
    ![Data Architecture](/fortpolio/md-images/classroom-dee_catch-me-my-capital/data_arch_1.png)

**Workflow**
1. MWAA DAGs collect raw data via APIs and web scraping
2. Raw data is stored in S3 Bronze Layer
3. Glue Crawlers detect schema changes
4. Data catalog is updated
5. Glue ETL Jobs process Silver Layer
6. Processed data is stored in Redshift (Silver)
7. dbt transformations create Gold Layer datasets
8. Gold data is stored in Redshift and RDS
9. Data is served via FastAPI (Lambda)
10. Visualization via Tableau dashboards
11. Query testing via Athena
12. DAGs and scripts are deployed via GitHub Actions

### Provisioning (Terraform)
- **Network Setup**
  - MWAA uses 3 subnets across AZs:
    - Webserver Subnet
    - Worker Subnet
    - Scheduler Subnet
  - Internet Gateway (IGW): attached to Webserver subnet
  - NAT Gateway: for Worker & Scheduler outbound access
- **Compute**
  - Airflow runs on AWS Fargate (serverless containers)
- **Metadata Database**
  - Airflow metadata stored in Amazon Aurora
- **Monitoring**
  - AWS CloudWatch: Logs and performance monitoring
  - SQS: Message broker for Airflow tasks
- **Secrets Management**
  - AWS Secrets Manager for: API keys, DB credentials, Airflow variables
- **Storage**
  - S3 used as: Airflow root directory (DAGs, plugins, configs)
- **IAM**
  - Roles and policies for: S3, SQS, CloudWatch, Secrets Manager integration
- **Deployment Steps**
1. Initialize Secrets
   - Run `Startprocedure.sh` to clean existing secrets
2. Run Terraform
   - `terraform plan`, `terraform apply`

### Data Processing Workflow
![Dag Run Stats](/fortpolio/md-images/classroom-dee_catch-me-my-capital/dag_run_stat.png)
1. **Ingestion**: *Identify financial data sources (APIs & scraping)*
   - Examples:
     - APIs: Binance, New York Times, Bank of Korea, FSC
     - Crawling: Investing.com, KRX, Business Insider
   - Supports batch ingestion:
     - Daily, Weekly, Monthly, Quarterly, Yearly
   - Managed via Airflow DAGs
2. **Bronze Layer**: *Stores raw data with minimal transformation*
   - **Extract**
     - API calls, scraping, Python libraries
     - Custom Airflow Operators for reusable sources
   - **Transform**
     - Lightweight preprocessing (formatting, encoding, schema adjustments)
   - **Load**
     - Stored in S3 with partitioning: `ymd=YYYY-MM-DD`
     - Automatically recognized by Glue Crawlers
3. **Silver Layer**: *Cleaned and structured data for analysis*
   - **Extract**
     - Glue Crawlers → Data Catalog
     - GlueContext (from_catalog, from_options)
   - **Transform**
     - Glue Spark jobs:
       - Deduplication
       - Missing value handling
   - **Load**
     - Stored in Redshift (Silver schema)
     - Table types:
       - fact_ tables (metrics)
       - dim_ tables (metadata)
4. **Gold Layer**: *Optimized for analytics and visualization*
   - **Extract**
     - Data from Redshift (Silver)
   - **Transform**
     - dbt SQL transformations: Joins, filtering, aggregations
   - **Load**
     - Stored in Redshift (Gold schema)
     - Naming convention: `mart_` prefix

5. **Serving Layer**
![Dashboard](/fortpolio/md-images/classroom-dee_catch-me-my-capital/dash.png)
   - **Visualization (Tableau)**: Interactive dashboards with filtering
   - **API Serving (FastAPI on Lambda)**: Data exposed via API

### Development Environment Setup
- **Python version**: `3.11.8`
- **Dependencies**
    ```bash
    pip install -r requirements-dev.txt
    ```
- **Pre-commit Setup**
    ```bash
    chmod -R +x ./scripts/
    pre-commit install
    pre-commit install --hook-type commit-msg
    ```
