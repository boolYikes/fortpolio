import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const GH_TOKEN = process.env.GH_TOKEN
const ORGS = (process.env.ORGS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

const EXCLUDE_FULL_NAME = process.env.EXCLUDE_FULL_NAME
const OUTPUT_DIR = path.resolve('src/content/markdowns')

if (!GH_TOKEN) {
  console.error('Missing GH_TOKEN env var (PAT).')
  process.exit(1)
}

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

async function ghFetch(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`GitHub API ${res.status} for ${url}\n${text}`)
  }
  return res.json()
}

async function ghFetchRawReadme(owner, repo, ref) {
  const url = `https://api.github.com/repos/${owner}/${repo}/readme?ref=${encodeURIComponent(ref)}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: 'application/vnd.github.raw',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (res.status === 404) return null
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`README fetch ${res.status} for ${owner}/${repo}\n${text}`)
  }
  return res.text()
}

function isFrontmatterValid(data) {
  // Enforce schema
  return (
    typeof data?.name === 'string' &&
    data.name.trim().length > 0 &&
    (typeof data?.date === 'string' || data?.date instanceof Date) &&
    Array.isArray(data?.tags) &&
    data.tags.every((t) => typeof t === 'string') &&
    typeof data?.summary === 'string' &&
    data.summary.trim().length > 0
  )
}

function normalizeReadme(raw) {
  // Keep as-is; ensure it ends with newline for stable diffs.
  return raw.endsWith('\n') ? raw : raw + '\n'
}

async function listUserRepos() {
  // /user/repos includes private repos accessible by PAT
  const repos = []
  let page = 1
  while (true) {
    const url = `https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated`
    const batch = await ghFetch(url)
    repos.push(...batch)
    if (batch.length < 100) break
    page++
  }
  return repos
}

async function listOrgRepos(org) {
  const repos = []
  let page = 1
  while (true) {
    const url = `https://api.github.com/orgs/${org}/repos?per_page=100&page=${page}&type=all&sort=updated`
    const batch = await ghFetch(url)
    repos.push(...batch)
    if (batch.length < 100) break
    page++
  }
  return repos
}

function uniqueByFullName(repos) {
  const map = new Map()
  for (const r of repos) map.set(r.full_name, r)
  return [...map.values()]
}

async function main() {
  const all = []

  all.push(...(await listUserRepos()))

  for (const org of ORGS) {
    all.push(...(await listOrgRepos(org)))
  }

  const repos = uniqueByFullName(all)
    .filter((r) => r?.full_name && r.full_name !== EXCLUDE_FULL_NAME)

  let changed = 0
  let eligible = 0

  for (const repo of repos) {
    const owner = repo.owner?.login
    const name = repo.name
    const defaultBranch = repo.default_branch

    if (!owner || !name || !defaultBranch) continue

    const raw = await ghFetchRawReadme(owner, name, defaultBranch)
    if (!raw) continue

    // Validate frontmatter schema using gray-matter
    let parsed
    try {
      parsed = matter(raw)
    } catch {
      continue
    }

    if (!isFrontmatterValid(parsed.data)) {
      continue
    }

    eligible++

    const fileName = `${owner}_${name}.md`
    const outPath = path.join(OUTPUT_DIR, fileName)
    const nextContent = normalizeReadme(raw)

    const prevContent = fs.existsSync(outPath)
      ? fs.readFileSync(outPath, 'utf-8')
      : null

    if (prevContent !== nextContent) {
      fs.writeFileSync(outPath, nextContent, 'utf-8')
      changed++
      console.log(`Updated: ${fileName}`)
    }
  }

  console.log(`Eligible repos: ${eligible}`)
  console.log(`Changed markdowns: ${changed}`)

  // Exit code 0 always; workflow decides based on git diff.
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
