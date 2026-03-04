import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProjectListPage from '../pages/ProjectListPage'
import { ProjectContext } from '../app/store/ProjectContext'
import { vi } from 'vitest'

import type { ProjectMeta } from '../types/project'

const mockProjects: ProjectMeta[] = [
  {
    id: 'a',
    name: 'Alpha',
    date: '2026-01-01',
    tags: ['react'],
    summary: 'Alpha summary',
  },
  {
    id: 'b',
    name: 'Beta',
    date: '2026-02-01',
    tags: ['typescript'],
    summary: 'Beta summary',
  },
]

function renderWithContext(visibleProjects: ProjectMeta[]) {
  return render(
    <MemoryRouter>
      <ProjectContext.Provider
        value={{
          projects: mockProjects,
          visibleProjects,
          selectedTags: [],
          sortMode: 'date-desc',
          setTags: vi.fn(),
          setSortMode: vi.fn(),
          resetFilter: vi.fn(),
          loading: false,
          allTags: [],
        }}
      >
        <ProjectListPage />
      </ProjectContext.Provider>
    </MemoryRouter>,
  )
}

test('renders project cards', () => {
  renderWithContext(mockProjects)

  expect(screen.getByText('Alpha')).toBeInTheDocument()

  expect(screen.getByText('Beta')).toBeInTheDocument()
})

test('shows empty state when no visible projects', () => {
  renderWithContext([])

  expect(screen.getByText('No projects found.')).toBeInTheDocument()
})
