import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const markdownDir = path.resolve('src/content/markdowns')

const outputDir = path.resolve('src/content/generated')

const outputFile = path.join(outputDir, 'projects.json')

if (!fs.existsSync(markdownDir)) {
  console.log('No markdown directory found.')
  process.exit(0)
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const files = fs.readdirSync(markdownDir).filter((f) => f.endsWith('.md'))

const projects = []

// Note: dupe in sync script
function isFrontmatterValid(data) {
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

// Note: dupe in sync script
function stripFrontmatterComment(raw) {
  const regex = /^\s*<!--\s*\n?(---[\s\S]*?---)\s*\n?\s*-->/

  const match = raw.match(regex)

  if (!match) return raw

  // replace the comment block with the frontmatter itself
  return raw.replace(match[0], match[1])
}

for (const file of files) {
  const fullPath = path.join(markdownDir, file)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const cleaned = stripFrontmatterComment(raw)
  const { data } = matter(cleaned)

  // schema check
  if (!isFrontmatterValid(data)) {
    console.log(`Skipping ${file} — invalid frontmatter`)
    continue
  }

  projects.push({
    id: file.replace('.md', ''),
    name: data.name,
    date: data.date,
    tags: data.tags,
    summary: data.summary,
  })
}

fs.writeFileSync(outputFile, JSON.stringify(projects, null, 2))

console.log(`Generated ${projects.length} project metadata entries.`)
