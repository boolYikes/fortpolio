export interface ProjectFrontmatter {
  name: string
  date: string
  tags: string[]
  summary: string
}

export interface ProjectMeta extends ProjectFrontmatter {
  id: string // filename without extension
}
