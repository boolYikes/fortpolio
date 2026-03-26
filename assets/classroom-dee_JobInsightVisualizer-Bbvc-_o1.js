const e=`---
name: Job Trend Visualizer
date: 2024-09-30
tags: [python, django, redshift, sql]
summary: Analyzes job market data to extract structured insights on hiring trends, role distributions, and required skill sets.
---

# Job Trend Visualizer

Analyzes job market data to extract structured insights on hiring trends, role distributions, and required skill sets.

### Overview
It serves as an introductory implementation of a data pipeline, providing practical experience with data collection, transformation, and analysis workflows, while laying the groundwork for more advanced concepts such as orchestration, data warehouses, and data lakes.

### What It Does
- Collects job posting data and organizes it into analyzable datasets
- Aggregates postings by role and region to identify distribution patterns
- Computes the ratio of entry-level vs. experienced positions across regions
- Extracts and categorizes technology stacks associated with different job types
- Performs relational analysis on:
  - Programming languages and job categories
  - Co-occurrence patterns between technologies
- Produces structured outputs suitable for visualization and further analysis

### Architecture
![Architecture](/fortpolio/md-images/classroom-dee_JobInsightVisualizer/arch_ai.jpg)

### Modeling
- Structured tables
    ![Structured](/fortpolio/md-images/classroom-dee_JobInsightVisualizer/structured_tables.jpg)
- Denormalized tables
    ![Denormalized](/fortpolio/md-images/classroom-dee_JobInsightVisualizer/denormalized_tables.jpg)

### The Dashboard
![Dashboard](/fortpolio/md-images/classroom-dee_JobInsightVisualizer/a1_dash.jpg)

### Dependencies
- \`Python 3.12.7\`
- \`Django 5.1.2\`
- See \`requirements.txt\`
`;export{e as default};
