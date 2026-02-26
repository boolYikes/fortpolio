import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { ProjectMeta } from '../types/project'

interface Props {
  project: ProjectMeta
}

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate()

  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
        },
      }}
      onClick={() =>
        navigate(`/project/${project.id}`)
      }
    >
      <CardContent>
        {/* Title */}
        <Typography variant="h6" gutterBottom>
          {project.name}
        </Typography>
        
        {/* Body */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          {/* Summary on the left */}
          <Box flex={1} minWidth={0}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-flex',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
              // noWrap
            >
              [{project.date}] {project.summary}
            </Typography>
          </Box>

          {/* Tags on the right*/}
          <Box
            display="flex"
            gap={1}
            flexWrap='nowrap'
            sx={{
              overflow: 'hidden',
              maxWidth: '40%',
            }}
          >
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
