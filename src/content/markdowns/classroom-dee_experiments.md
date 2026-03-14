---
name: Experiments
date: 2026-02-20
tags: [python, postgresql, grafana, prometheus, neo4j, pytorch, docker]
summary: A collection of PoCs, experiments, scribbles, snippets and the unfinished
---

# Experiments
This repository is a collection of **computational experiments**, **simulations**, and **project/toolchain PoCs**.

Experiments are exploratory by design and may prioritize clarity and insight over performance or completeness.

Scripts are generally self-contained and parameter-driven.  
Generated artifacts (plots, animations, data snapshots) are gitignore-d.

## Manifest
| Name | Type | Description |
|--------|--------|--------|
| **Iterated Quadratic Map (Mandelbrot)** | Simulation / Visualization | Escape-time simulation of the Mandelbrot set, including stepwise evolution and animation of boundary determination. |
| **Neo4j Relationship Toy Model** | Toolchain / Data Modeling | Simple Neo4j experiment connecting three people via relationships and visualizing the resulting graph. Created as an introductory exploration of graph databases. |
| **CLIP Model PoC** | Toolchain | Simple PoC scripts for testing workflows using the CLIP contrastive model. |
| **Project Infra PoC** | Toolchain | Configuration PoC for a specific ongoing project. |
| **PostgreSQL** | Benchmark | Configuration for starting the environment. |

## Dependencies
- **Python 3.11.9**
- check `requirements.txt` but don't run `pip install -r`. It's just a reminder
