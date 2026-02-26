import { Typography, CircularProgress, Box } from '@mui/material'
import ProjectCard from '../components/ProjectCard'
import { useProjects } from '../app/store/ProjectContext'

export default function ProjectListPage() {
  const { visibleProjects, loading } = useProjects()

  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  if (visibleProjects.length === 0) {
    return <Typography>No projects found.</Typography>
  }

  return (
    <>
      {visibleProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  )
}
