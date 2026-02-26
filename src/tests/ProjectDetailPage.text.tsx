import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProjectDetailPage from '../pages/ProjectDetailPage'
import { ProjectContext } from '../app/store/ProjectContext'
import type { ProjectMeta } from '../types/project'

jest.mock('../content/markdownRegistry', () => ({
  markdownModules: {
    '/src/content/markdowns/a.md': async () =>
      `---
name: Alpha
date: 2026-01-01
tags: [react]
summary: test
---
# Hello World`,
  },
}))

const mockProjects: ProjectMeta[] = [
  {
    id: 'a',
    name: 'Alpha',
    date: '2026-01-01',
    tags: ['react'],
    summary: 'Alpha summary',
  },
]

test('renders markdown content', async () => {
  render(
    <MemoryRouter initialEntries={['/project/a']}>
      <ProjectContext.Provider
        value={{
          projects: mockProjects,
          visibleProjects: mockProjects,
          selectedTags: [],
          sortMode: 'date-desc',
          setTags: jest.fn(),
          setSortMode: jest.fn(),
          resetFilter: jest.fn(),
          loading: false,
          allTags: [],
        }}
      >
        <Routes>
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Routes>
      </ProjectContext.Provider>
    </MemoryRouter>,
  )

  await waitFor(() =>
    expect(screen.getByText('Hello World')).toBeInTheDocument(),
  )
})
