<!--
---
name: Port Folio Compiler
date: 2026-03-03
tags: [react, vite, typescript, node, githubaction, githubpage]
summary: Aggregates and serves all owned repo's READMEs
---
-->

[![Deployment](https://github.com/boolyikes/fortpolio/actions/workflows/sync-readmes-and-deploy.yml/badge.svg)](https://github.com/boolyikes/fortpolio/actions/workflows/sync-readmes-and-deploy.yml)

## Fortpolio

Wouldn't it be a less of a hassle for you and me if everything worthy of noting were in one place?
This is my personal static portfolio aggregator powered by **React + Vite + TypeScript**, deployed via **GitHub Pages**.

Live site: [Link](https://boolyikes.github.io/fortpolio/)

### ✨ Overview

This portfolio is fully static and automatically synchronized with selected GitHub repositories.

Every 24 hours:

- GitHub Actions polls all owned repositories (including private + specified orgs)
- Repositories with valid README frontmatter are collected
- README files are copied into `src/content/markdowns/`
- Metadata is generated at build time
- Tests run
- Site rebuilds
- `gh-pages` branch updates
- GitHub Pages redeploys

No backend required.

### 🧱 Tools

- **Hosting**: GitHub Pages
- **Framework**: React (Vite + TypeScript)
- **UI**: MUI
- **Routing**: React Router (HashRouter)
- **Markdown Rendering**: react-markdown + remark-gfm + rehype-sanitize
- **Frontmatter Parsing (build-time)**: gray-matter
- **Tests**: Jest + Testing Library

### 📂 Project Structure

root/.syncignore<br>
root/src/<br>
├── app/<br>
│ ├── layout/<br>
│ ├── router/<br>
│ ├── store/<br>
│ └── theme/<br>
├── components/<br>
├── content/<br>
│ ├── markdowns/ # Synced README files<br>
│ └── generated/ # Auto-generated metadata<br>
├── pages/<br>
├── tests/<br>
└── types/<br>
root/scripts/<br>
├── generateProjects.mjs<br>
└── syncReadmes.mjs<br>

### 📝 README Frontmatter Schema

To be included in the portfolio, a repository’s `README.md` must contain:

```yaml
---
name: Project Name
date: 2026-03-01
tags: [react, typescript]
summary: Short description of the project.
---
If the schema does not match, the repository is ignored.
```

### 🚀 Development

- `npm install`
- `npm run dev`

### 🏗 Build

- _predeploy command already does this_
- `npm run build`

### 🚀 Deploy (Manual)

- `npm run deploy`

### Note & Possible Improvements

- Org fetching seems redundant (**user repo fetch** with a token already fetches all user owned repos)
- Viewed from GitHub, the front matter makes the README look a bit messy. Consider .repometa or comments <!--y e es -->.
- like this

```js
const matter = require('gray-matter')

const cleaned = content.replace(/<!--\s*([\s\S]*?)\s*-->/, '$1')
const result = matter(cleaned)
```
