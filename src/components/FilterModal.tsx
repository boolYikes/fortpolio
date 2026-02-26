import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Chip,
  Button,
} from '@mui/material'
import { useProjects } from '../app/store/ProjectContext'

interface Props {
  open: boolean
  onClose: () => void
}

export default function FilterModal({
  open,
  onClose,
}: Props) {
  const {
    allTags,
    selectedTags,
    setTags,
    resetFilter,
  } = useProjects()

  function toggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      setTags(
        selectedTags.filter((t) => t !== tag)
      )
    } else {
      setTags([...selectedTags, tag])
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Filter</DialogTitle>

      <DialogContent>
        {/* Selected tags */}
        <Box mb={2} display="flex" gap={1} flexWrap="wrap">
          {selectedTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() =>
                toggleTag(tag)
              }
              color="primary"
            />
          ))}
        </Box>

        <Box mb={2}>
          <Button onClick={resetFilter}>
            Reset Filter
          </Button>
        </Box>

        {/* All tags */}
        <Box display="flex" gap={1} flexWrap="wrap">
          {allTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              clickable
              color={
                selectedTags.includes(tag)
                  ? 'primary'
                  : 'default'
              }
              onClick={() =>
                toggleTag(tag)
              }
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  )
}
