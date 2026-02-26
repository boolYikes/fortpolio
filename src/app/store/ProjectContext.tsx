import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ProjectMeta } from '../../types/project'
import projectsData from '@content/generated/projects.json'

type SortMode = 'date-desc' | 'alpha'

interface ProjectContextValue {
  projects: ProjectMeta[]
  visibleProjects: ProjectMeta[]
  selectedTags: string[]
  sortMode: SortMode
  setTags: (tags: string[]) => void
  setSortMode: (mode: SortMode) => void
  resetFilter: () => void
  loading: boolean
  allTags: string[]
}

export const ProjectContext = createContext<ProjectContextValue | null>(null)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectMeta[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortMode, setSortMode] = useState<SortMode>('date-desc')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function init() {
      setProjects(projectsData)
      setLoading(false)
    }

    init()
  }, [])

  const visibleProjects = useMemo(() => {
    let result = [...projects]

    // FILTER
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.every((tag) => p.tags.includes(tag)),
      )
    }

    // SORT
    if (sortMode === 'date-desc') {
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
    } else if (sortMode === 'alpha') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [projects, selectedTags, sortMode])

  const allTags = useMemo(() => {
    const set = new Set<string>()

    projects.forEach((p) => {
      p.tags.forEach((t) => set.add(t))
    })

    return Array.from(set).sort()
  }, [projects])

  function resetFilter() {
    setSelectedTags([])
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        visibleProjects,
        selectedTags,
        sortMode,
        setTags: setSelectedTags,
        setSortMode,
        resetFilter,
        loading,
        allTags,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProjects must be used inside ProjectProvider')
  return ctx
}
